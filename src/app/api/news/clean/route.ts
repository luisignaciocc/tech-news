import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

import { notifyProblem } from "@/lib/utils";

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const prisma = new PrismaClient();

    const [unansweredNews] = await Promise.all([
      prisma.news.findMany({
        where: {
          sentToApproval: true,
          deletedAt: null,
          filtered: false,
          createdAt: {
            lt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          },
        },
        select: {
          id: true,
          telegramChatId: true,
          telegramMessageId: true,
        },
      }),
      prisma.news.deleteMany({
        where: {
          createdAt: {
            lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
          },
          posts: {
            none: {},
          },
        },
      }),
    ]);

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (TOKEN) {
      const bot = new TelegramBot(TOKEN);

      for (const post of unansweredNews) {
        await Promise.all([
          prisma.news.update({
            where: {
              id: post.id,
            },
            data: {
              deletedAt: new Date(),
            },
          }),
          post.telegramChatId &&
            post.telegramMessageId &&
            bot.editMessageReplyMarkup(
              { inline_keyboard: [] },
              {
                chat_id: +post.telegramChatId,
                message_id: +post.telegramMessageId,
              },
            ),
        ]);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Error cleaning news", error);
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
