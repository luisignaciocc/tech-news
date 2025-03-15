import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

// Initialize Prisma Client as a singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BATCH_SIZE = 5; // Process 5 articles at a time to avoid OpenAI rate limits

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const news = await tx.news.findMany({
        where: {
          parsed: true,
          vectorized: false,
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
        select: {
          id: true,
          body: true,
        },
      });

      if (news.length === 0) {
        return NextResponse.json({ success: true }, { status: 200 });
      }

      // Process in smaller batches to avoid rate limits
      const results = [];
      for (let i = 0; i < news.length; i += BATCH_SIZE) {
        const batch = news.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
          batch.map(async (article) => {
            if (!article.body) {
              return {
                id: article.id,
                action: "delete" as const,
                reason: "Empty body from the original news fetch",
              };
            }

            try {
              const embeddingsData = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: article.body,
                encoding_format: "float",
              });

              return {
                id: article.id,
                action: "update" as const,
                embedding: embeddingsData.data[0].embedding,
              };
            } catch (error) {
              return {
                id: article.id,
                action: "delete" as const,
                reason: "Error vectorizing news",
              };
            }
          }),
        );
        results.push(...batchResults);

        // Add a small delay between batches to respect rate limits
        if (i + BATCH_SIZE < news.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      // Batch process updates and deletes
      const toUpdate = results.filter((r) => r.action === "update");
      const toDelete = results.filter((r) => r.action === "delete");

      if (toUpdate.length > 0) {
        await Promise.all(
          toUpdate.map(
            (item) =>
              tx.$executeRaw`
              UPDATE "News"
              SET 
                  embedding = ${item.embedding}::vector,
                  vectorized = true
              WHERE id = ${item.id};
            `,
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
            deletionReason: toDelete[0].reason || "Error vectorizing news",
          },
        });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    });
  } catch (error: unknown) {
    await notifyProblem("Error vectorizing news", error);
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
