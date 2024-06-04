import { Readability } from "@mozilla/readability";
import { PrismaClient } from "@prisma/client";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { parseString } from "xml2js";

import { notifyProblem } from "@/lib/utils";

interface RssChannel {
  generator: string;
  title: string;
  link: string;
  language: string;
  webMaster: string;
  copyright: string;
  lastBuildDate: string;
  description: string;
  item: RssItem[];
}

interface RssItem {
  title: string;
  link: string[];
  guid: {
    isPermaLink: boolean;
    content: string;
  };
  pubDate: string;
  description: string;
  source: {
    url: string;
    content: string;
  };
}

interface RssResponse {
  rss: {
    "@xmlns:media": string;
    "@version": string;
    channel: RssChannel[];
  };
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const prisma = new PrismaClient();

    const oldestNewsSource = await prisma.newsSource.findFirst({
      where: {
        isActive: true,
      },
      orderBy: {
        lastUpdateAt: "asc",
      },
      select: {
        id: true,
        url: true,
        lastUpdateAt: true,
      },
    });

    if (!oldestNewsSource) {
      return NextResponse.json(
        { error: "No valid news source found" },
        { status: 404 },
      );
    }

    const url = `https://news.google.com/rss/search?q=site:${oldestNewsSource.url}+when:2d&hl=en-IN&gl=IN&ceid=IN:en`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      await notifyProblem("Pulling news from Brave Search", error);
      return NextResponse.json({ error: error }, { status: 500 });
    }

    const xmlData = await response.text();

    const data = await new Promise<RssResponse>((resolve, reject) => {
      parseString(xmlData, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    const newsItems = data.rss.channel[0].item;
    const links = newsItems.map((item: { link: string[] }) => item.link[0]);

    const articleData: { link: string; dataNAu: string | null }[] = [];

    for (const link of links) {
      try {
        const response = await fetch(link);
        const responseText = await response.text();

        const doc = new JSDOM(responseText).window.document;
        const reader = new Readability(doc);
        const article = reader.parse();

        const container = doc.createElement("div");

        if (article && article.content) {
          container.innerHTML = article.content;
        } else {
          articleData.push({ link, dataNAu: null });
          continue;
        }

        const dataNAu = container
          .querySelector("[data-n-au]")
          ?.getAttribute("data-n-au");

        articleData.push({ link, dataNAu });
      } catch (error) {
        articleData.push({ link, dataNAu: null });
      }
    }

    return NextResponse.json(articleData);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Error when making API request: ${error}`,
      },
      { status: 500 },
    );
  }
}
