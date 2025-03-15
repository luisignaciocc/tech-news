import { Readability } from "@mozilla/readability";
import { PrismaClient } from "@prisma/client";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { parseString } from "xml2js";

export const maxDuration = 60;

// Initialize Prisma Client as a singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

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

  try {
    return await prisma.$transaction(async (tx) => {
      const oldestNewsSource = await tx.newsSource.findFirst({
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

      const searchQuery = `site:${oldestNewsSource.url}+when:2d&hl=en-IN&gl=IN&ceid=IN:en`;
      const url = `https://news.google.com/rss/search?q=${searchQuery}`;

      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 4000);

      const response = await fetch(url, {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        await tx.newsSource.update({
          where: { id: oldestNewsSource.id },
          data: { lastUpdateAt: new Date() },
        });
        return NextResponse.json(
          { error: "Error al obtener el listado de noticias" },
          { status: 500 },
        );
      }

      const xmlData = await response.text();
      const data = await new Promise<RssResponse>((resolve, reject) => {
        parseString(xmlData, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });

      const newsItems = data.rss.channel[0].item;

      if (!newsItems) {
        await tx.newsSource.update({
          where: { id: oldestNewsSource.id },
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
        .filter((item) => new Date(item.pubDate) >= oneDaysAgo);

      // Batch process articles
      const processedArticles = await Promise.all(
        articleData.map(async (article) => {
          try {
            const response = await fetch(article.link, {
              signal: controller.signal,
            });
            if (!response.ok) return null;

            const responseText = await response.text();
            const doc = new JSDOM(responseText).window.document;
            const reader = new Readability(doc);
            const parsedArticle = reader.parse();

            if (!parsedArticle?.content) return null;

            const container = doc.createElement("div");
            container.innerHTML = parsedArticle.content;
            const dataNAu = container
              .querySelector("[data-n-au]")
              ?.getAttribute("data-n-au");

            return dataNAu
              ? {
                  title: String(article.title),
                  url: dataNAu,
                  sourceUrl: article.link,
                  publishedAt: new Date(article.pubDate).toISOString(),
                  sourceId: oldestNewsSource.id,
                  searchQuery,
                }
              : null;
          } catch {
            return null;
          }
        }),
      );

      // Filter out nulls and create all news items in a single batch
      const validArticles = processedArticles.filter(
        (article): article is NonNullable<typeof article> => article !== null,
      );

      if (validArticles.length > 0) {
        // Check for existing articles in batch
        const existingUrls = await tx.news.findMany({
          where: {
            url: {
              in: validArticles.map((a) => a.url),
            },
          },
          select: {
            url: true,
          },
        });

        const existingUrlSet = new Set(existingUrls.map((e) => e.url));
        const newArticles = validArticles.filter(
          (article) => !existingUrlSet.has(article.url),
        );

        if (newArticles.length > 0) {
          await tx.news.createMany({
            data: newArticles,
            skipDuplicates: true,
          });
        }
      }

      await tx.newsSource.update({
        where: {
          id: oldestNewsSource.id,
        },
        data: {
          lastUpdateAt: new Date(),
        },
      });

      return NextResponse.json({ success: true }, { status: 200 });
    });
  } catch (error) {
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
