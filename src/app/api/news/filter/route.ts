import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const _SIMILARITY_THRESHOLD = 0.8;
const bannedWords = ["wordle", "quordle", "nyt"];

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
      where: {
        vectorized: true,
        filtered: false,
        valid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        title: true,
      },
    });

    for (const article of news) {
      const similarNews: [
        {
          id: string;
          similarity: number;
        },
      ] = await prisma.$queryRaw`
      WITH comparation AS (
        SELECT embedding AS comparation_embedding
        FROM "News"
        WHERE id = ${article.id}
      )
      SELECT n.id,
            1 - (n.embedding <=> c.comparation_embedding) AS similarity
      FROM "News" n,
            comparation c
      WHERE n.id != ${article.id}
      ORDER BY similarity DESC
      LIMIT 1;
    `;

      if (similarNews[0].similarity > _SIMILARITY_THRESHOLD) {
        await prisma.news.delete({
          where: {
            id: article.id,
          },
        });
      } else {
        if (
          bannedWords.some((word) => article.title.toLowerCase().includes(word))
        ) {
          await prisma.news.delete({
            where: {
              id: article.id,
            },
          });
        } else {
          await prisma.news.update({
            where: {
              id: article.id,
            },
            data: {
              filtered: true,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
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
