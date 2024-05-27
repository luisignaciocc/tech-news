import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface NewsResult {
  type: string;
  title: string;
  url: string;
  description: string;
  age: string;
  page_age: string;
  meta_url: {
    scheme: string;
    netloc: string;
    hostname: string;
    favicon: string;
    path: string;
  };
  thumbnail: {
    src: string;
  };
}

export async function POST(request: Request) {
  const apikey = request.headers.get("x-api-key");

  if (apikey !== process.env.API_KEY) {
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

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const keyword = alphabet[randomIndex];

    const searchQuery = oldestNewsSource
      ? `${keyword} site:${oldestNewsSource.url}`
      : `${keyword}`;

    const url =
      "https://api.search.brave.com/res/v1/news/search?q=" + searchQuery;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY || "",
    };

    const response = await fetch(url, {
      headers: headers,
      cache: "no-store",
    });

    const { results }: { results: NewsResult[] } = await response.json();

    const oneDaysAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    for (const result of results) {
      const pageAge = new Date(result.page_age);

      if (pageAge >= oneDaysAgo) {
        try {
          const existingNews = await prisma.news.findUnique({
            where: {
              url: result.url,
            },
          });

          if (!existingNews) {
            await prisma.news.create({
              data: {
                title: result.title,
                url: result.url,
                sourceUrl: result.meta_url.hostname,
                thumbnailUrl: result.thumbnail.src,
                publishedAt: pageAge,
                sourceId: oldestNewsSource ? oldestNewsSource.id : null,
                searchQuery: searchQuery,
              },
            });
          }
        } catch (error) {
          continue;
        }
      }
    }

    if (oldestNewsSource) {
      await prisma.newsSource.update({
        where: {
          id: oldestNewsSource.id,
        },
        data: {
          lastUpdateAt: new Date(),
        },
      });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al hacer la solicitud a la API: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API:" },
        { status: 500 }
      );
    }
  }
}
