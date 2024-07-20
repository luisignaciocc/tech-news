import { Readability } from "@mozilla/readability";
import { PrismaClient } from "@prisma/client";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { parseString } from "xml2js";

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
  title: [string];
  link: [string];
  guid: [
    {
      _: string;
      $: {
        isPermaLink: string;
      };
    },
  ];
  pubDate: [string];
  description: [string];
  source: [
    {
      _: string;
      $: {
        url: string;
      };
    },
  ];
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

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000);

    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

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

    const oneDaysAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const articleData = newsItems
      .map((item: RssItem) => ({
        title: item.title[0],
        link: item.link[0],
        guid: item.guid[0]._,
        pubDate: item.pubDate[0],
        description: item.description[0],
        source: item.source[0].$.url,
        dataNAu: null,
      }))
      .filter((item) => {
        const pageAge = new Date(item.pubDate);
        return pageAge >= oneDaysAgo;
      });

    try {
      let article;
      for (const googleNewsItem of articleData) {
        const existingNews = await prisma.news.findFirst({
          where: {
            title: {
              equals: googleNewsItem.title,
              mode: "insensitive",
            },
          },
        });
        if (!existingNews) {
          article = googleNewsItem;
        }
      }

      if (!article) {
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
          { error: "No new news items found on " + oldestNewsSource.name },
          { status: 404 },
        );
      }

      const encodedTitle = encodeURIComponent(
        article.title + " site:" + oldestNewsSource.url,
      );
      const braveUrl =
        "https://api.search.brave.com/res/v1/web/search?q=" + encodedTitle;

      const braveResponse = await fetch(braveUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY || "",
        },
        cache: "no-store",
      });

      if (!braveResponse.ok) {
        return NextResponse.json(
          { error: "Error al obtener la noticia más similar" },
          { status: 500 },
        );
      }

      const braveData: {
        web?: {
          results?: {
            title: string;
            url: string;
          }[];
        };
      } = await braveResponse.json();

      const mostSimilarNew = braveData?.web?.results?.[0];

      if (!mostSimilarNew) {
        return NextResponse.json(
          { error: "No similar news found" },
          { status: 404 },
        );
      }

      const response = await fetch(mostSimilarNew.url);

      if (!response.ok) {
        return NextResponse.json(
          { error: "Error al obtener el artículo" },
          { status: 500 },
        );
      }

      const responseText = await response.text();
      const doc = new JSDOM(responseText).window.document;
      const reader = new Readability(doc);
      const parsedArticle = reader.parse();

      const container = doc.createElement("div");

      if (parsedArticle && parsedArticle.content) {
        container.innerHTML = parsedArticle.content;
      } else {
        return NextResponse.json(
          { error: "Error al analizar el artículo" },
          { status: 500 },
        );
      }

      await prisma.news.create({
        data: {
          title: String(article.title),
          url: mostSimilarNew.url,
          sourceUrl: article.link,
          publishedAt: new Date(article.pubDate).toISOString(),
          sourceId: oldestNewsSource ? oldestNewsSource.id : null,
          searchQuery: encodedTitle,
        },
      });
    } catch (error) {
      await prisma.newsSource.update({
        where: {
          id: oldestNewsSource.id,
        },
        data: {
          lastUpdateAt: new Date(),
        },
      });
      return NextResponse.json(
        { error: "Error obteniendo noticia" },
        { status: 500 },
      );
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
