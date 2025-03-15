import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

import { notifyProblem } from "@/lib/utils";

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
      // Get unanswered news and delete old news in parallel
      const [unansweredNews] = await Promise.all([
        tx.news.findMany({
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
        tx.news.deleteMany({
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

      if (unansweredNews.length === 0) {
        return NextResponse.json({ success: true }, { status: 200 });
      }

      const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

      if (TOKEN) {
        const bot = new TelegramBot(TOKEN);

        // Batch update all unanswered news
        await tx.news.updateMany({
          where: {
            id: {
              in: unansweredNews.map((post) => post.id),
            },
          },
          data: {
            deletedAt: new Date(),
            deletionReason: "Not approved in time (24h - Telegram)",
          },
        });

        // Update Telegram messages in parallel
        await Promise.all(
          unansweredNews
            .filter((post) => post.telegramChatId && post.telegramMessageId)
            .map((post) =>
              bot.editMessageReplyMarkup(
                { inline_keyboard: [] },
                {
                  chat_id: +post.telegramChatId!,
                  message_id: +post.telegramMessageId!,
                },
              ),
            ),
        );
      }

      return NextResponse.json({ success: true }, { status: 200 });
    });
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
