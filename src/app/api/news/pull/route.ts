import { Readability } from "@mozilla/readability";
import { PrismaClient } from "@prisma/client";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { parseString } from "xml2js";

import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

interface RssChannel {
  generator: string;
  title: string;
  link: string;
  language: string;
  webMaster: string;
  copyright: string;
  lastBuildDate: string;
  description: string;
  item: RssItem[] | null;
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
      name: true,
    },
  });

  if (!oldestNewsSource) {
    return NextResponse.json(
      { error: "No valid news source found" },
      { status: 404 },
    );
  }

  try {
    const searchQuery = `site:${oldestNewsSource.url}+when:2d&hl=en-IN&gl=IN&ceid=IN:en`;

    const url = `https://news.google.com/rss/search?q=${searchQuery}`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = "Error al obtener el listado de noticias";
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

    if (!newsItems) {
      await prisma.newsSource.update({
        where: {
          id: oldestNewsSource.id,
        },
        data: {
          lastUpdateAt: new Date(),
          isActive: false,
        },
      });
      return NextResponse.json(
        { error: "No news items found on " + oldestNewsSource.name },
        { status: 404 },
      );
    }

    const articleData = newsItems.map((item: RssItem) => ({
      title: item.title,
      link: item.link[0],
      guid: item.guid.content,
      pubDate: item.pubDate,
      description: item.description,
      source: item.source.url,
      dataNAu: null,
    }));

    for (const article of articleData) {
      try {
        const response = await fetch(article.link);

        if (!response.ok) {
          continue;
        }

        const responseText = await response.text();

        const doc = new JSDOM(responseText).window.document;
        const reader = new Readability(doc);
        const parsedArticle = reader.parse();

        const container = doc.createElement("div");

        if (parsedArticle && parsedArticle.content) {
          container.innerHTML = parsedArticle.content;
        } else {
          continue;
        }

        const dataNAu = container
          .querySelector("[data-n-au]")
          ?.getAttribute("data-n-au");

        article.dataNAu = dataNAu;

        if (article.dataNAu) {
          try {
            const existingNews = await prisma.news.findUnique({
              where: {
                url: article.dataNAu,
              },
            });

            if (!existingNews) {
              await prisma.news.create({
                data: {
                  title: String(article.title),
                  url: article.dataNAu,
                  sourceUrl: article.link,
                  publishedAt: new Date(article.pubDate).toISOString(),
                  sourceId: oldestNewsSource ? oldestNewsSource.id : null,
                  searchQuery: searchQuery,
                },
              });
            }
          } catch (error) {
            console.error(error);
            continue;
          }
        }
      } catch (error) {
        console.error(error);
        continue;
      }
    }

    await prisma.newsSource.update({
      where: {
        id: oldestNewsSource.id,
      },
      data: {
        lastUpdateAt: new Date(),
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    await prisma.newsSource.update({
      where: {
        id: oldestNewsSource.id,
      },
      data: {
        lastUpdateAt: new Date(),
      },
    });
    await notifyProblem(
      `Pulling news from Google News, view log for more info: ${oldestNewsSource.name}`,
      error,
    );
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al hacer la solicitud a la API: ${error.message}` },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API:" },
        { status: 500 },
      );
    }
  }
}
