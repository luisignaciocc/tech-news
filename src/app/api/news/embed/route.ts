import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
      where: {
        parsed: true,
        vectorized: false,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        body: true,
      },
    });

    for (const parse of news) {
      if (!parse.body) {
        await prisma.news.update({
          where: {
            id: parse.id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        continue;
      }

      const embeddingsData = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: parse.body,
        encoding_format: "float",
      });

      const embedding = embeddingsData.data[0].embedding;

      await prisma.$executeRaw`
        UPDATE "News"
        SET 
            embedding = ${embedding}::vector,
            vectorized = true
        WHERE id = ${parse.id};
      `;
    }

    return NextResponse.json({ success: true }, { status: 200 });
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
