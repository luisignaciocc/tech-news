import { Readability } from "@mozilla/readability";
import { PrismaClient } from "@prisma/client";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

import { notifyProblem } from "@/lib/utils";

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
      where: {
        parsed: false,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      select: {
        url: true,
        parsed: true,
        createdAt: true,
      },
    });

    await Promise.all(
      news.map(async (item) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
        }, 4000);

        try {
          const response = await fetch(item.url, {
            signal: controller.signal,
          });
          clearTimeout(timeout);
          const html = await response.text();
          const doc = new JSDOM(html).window.document;
          const reader = new Readability(doc);
          const article = reader.parse();

          if (
            !article ||
            !article.textContent ||
            (article.length && article.length < 1000)
          ) {
            await prisma.news.update({
              where: {
                url: item.url,
              },
              data: {
                deletedAt: new Date(),
              },
            });

            return false;
          }

          const cleanedTextContent = article.textContent
            .replace(/[\n\r\t]|\s{3,}/g, " ")
            .replace(/\s{2,}/g, " ")
            .trim();

          await prisma.news.update({
            where: {
              url: item.url,
            },
            data: {
              body: cleanedTextContent,
              byline: article?.byline,
              lang: article?.lang,
              length: article?.length,
              excerpt: article?.excerpt,
              siteName: article?.siteName,
              parsed: true,
            },
          });

          return true;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            await prisma.news.update({
              where: {
                url: item.url,
              },
              data: {
                deletedAt: new Date(),
              },
            });

            return false;
          } else {
            throw error;
          }
        }
      }),
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Parsing news from Brave Search", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al hacer la solicitud a la API: ${error.message}` },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API" },
        { status: 500 },
      );
    }
  }
}
