import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

import { TELEGRAM_PERSONAL_CHAT_ID } from "@/lib/telegram";
import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

const _SIMILARITY_THRESHOLD = 0.8;
const bannedWords = ["wordle", "quordle", "nyt", "review"];

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
        deletedAt: null,
        sentToApproval: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
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
        await prisma.news.update({
          data: {
            deletedAt: new Date(),
          },
          where: {
            id: article.id,
          },
        });
      } else {
        if (
          bannedWords.some((word) => article.title.toLowerCase().includes(word))
        ) {
          await prisma.news.update({
            data: {
              deletedAt: new Date(),
            },
            where: {
              id: article.id,
            },
          });
        } else {
          const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

          if (!TOKEN) {
            await prisma.news.update({
              where: {
                id: article.id,
              },
              data: {
                filtered: true,
              },
            });
          } else {
            const bot = new TelegramBot(TOKEN);

            const message = await bot.sendMessage(
              TELEGRAM_PERSONAL_CHAT_ID,
              `❔ ${article.title}`,
              {
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "Aprovar",
                        callback_data: `approve:accept:${article.id}`,
                      },
                      {
                        text: "Eliminar",
                        callback_data: `approve:delete:${article.id}`,
                      },
                    ],
                  ],
                },
              },
            );

            await prisma.news.update({
              where: {
                id: article.id,
              },
              data: {
                sentToApproval: true,
                telegramChatId: message.chat.id.toString(),
                telegramMessageId: message.message_id.toString(),
              },
            });
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Filtering news", error);
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
