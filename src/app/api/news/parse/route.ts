import { Readability } from "@mozilla/readability";
import { PrismaClient } from "@prisma/client";
import { JSDOM, VirtualConsole } from "jsdom";
import { NextResponse } from "next/server";

import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

// Initialize Prisma Client as a singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const news = await tx.news.findMany({
        where: {
          parsed: false,
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
        select: {
          id: true,
          url: true,
          parsed: true,
          createdAt: true,
        },
      });

      if (news.length === 0) {
        return NextResponse.json({ success: true }, { status: 200 });
      }

      const results = await Promise.all(
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
            const virtualConsole = new VirtualConsole();
            const doc = new JSDOM(html, { virtualConsole }).window.document;
            const reader = new Readability(doc);
            const article = reader.parse();

            if (
              !article ||
              !article.textContent ||
              (article.length && article.length < 1000)
            ) {
              return {
                id: item.id,
                action: "delete" as const,
              };
            }

            const cleanedTextContent = article.textContent
              .replace(/[\n\r\t]|\s{3,}/g, " ")
              .replace(/\s{2,}/g, " ")
              .trim();

            return {
              id: item.id,
              action: "update" as const,
              data: {
                body: cleanedTextContent,
                byline: article?.byline,
                lang: article?.lang,
                length: article?.length,
                excerpt: article?.excerpt,
                siteName: article?.siteName,
                parsed: true,
              },
            };
          } catch (error) {
            return {
              id: item.id,
              action: "delete" as const,
              reason: "Error parsing the article",
            };
          }
        }),
      );

      // Batch process updates and deletes
      const toUpdate = results.filter((r) => r.action === "update");
      const toDelete = results.filter((r) => r.action === "delete");

      if (toUpdate.length > 0) {
        await Promise.all(
          toUpdate.map((item) =>
            tx.news.update({
              where: { id: item.id },
              data: item.data,
            }),
          ),
        );
      }

      if (toDelete.length > 0) {
        await tx.news.updateMany({
          where: {
            id: {
              in: toDelete.map((item) => item.id),
            },
          },
          data: {
            deletedAt: new Date(),
            deletionReason: "Error parsing the article or content too short",
          },
        });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    });
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
