import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";

import { TELEGRAM_PERSONAL_CHAT_ID } from "@/lib/telegram";
import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

// Initialize Prisma Client as a singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const _SIMILARITY_THRESHOLD = 0.8;
const _BATCH_SIZE = 10;
const bannedWords = [
  "wordle",
  "quordle",
  "nyt",
  "review",
  "deal",
  "apk teardown",
  "pornography", // Add pornographic terms to the list
  "porn",
  "sex",
  "fetish",
  "pornhub",
  "xvideos",
  "xnxx",
  "hentai",
  "kardashian",
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    // Use transaction to ensure data consistency and reduce number of connections
    return await prisma.$transaction(
      async (tx) => {
        const news = await tx.news.findMany({
          where: {
            coverImage: {
              not: null,
            },
            deletedAt: null,
            sentToApproval: false,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: _BATCH_SIZE,
          select: {
            id: true,
            title: true,
          },
        });

        if (news.length === 0) {
          return NextResponse.json({ success: true }, { status: 200 });
        }

        // Optimized similarity query with index hint
        const newsIds = news.map((n) => n.id);
        const similarNewsResults: Array<{
          id: string;
          similar_to: string;
          similarity: number;
        }> = await tx.$queryRaw`
        WITH batch_news AS (
          SELECT id, embedding
          FROM "News"
          WHERE id = ANY(${newsIds})
        )
        SELECT DISTINCT ON (bn.id)
          bn.id,
          n.id as similar_to,
          1 - (n.embedding <=> bn.embedding) as similarity
        FROM batch_news bn
        INNER JOIN "News" n ON n.id != bn.id
        WHERE n.embedding IS NOT NULL
          AND n."deletedAt" IS NULL
          AND 1 - (n.embedding <=> bn.embedding) > ${_SIMILARITY_THRESHOLD}
        ORDER BY bn.id, (n.embedding <=> bn.embedding) ASC;
      `;

        // Batch update similar articles
        if (similarNewsResults.length > 0) {
          await tx.news.updateMany({
            where: {
              id: {
                in: similarNewsResults.map((r) => r.id),
              },
            },
            data: {
              deletedAt: new Date(),
              deletionReason: "Similar to existing article",
            },
          });
        }

        // Process remaining articles
        const nonSimilarArticles = news.filter(
          (article) => !similarNewsResults.find((r) => r.id === article.id),
        );

        for (const article of nonSimilarArticles) {
          if (
            bannedWords.some((word) =>
              article.title.toLowerCase().includes(word),
            )
          ) {
            await tx.news.update({
              data: {
                deletedAt: new Date(),
                deletionReason: `Contains banned word`,
              },
              where: {
                id: article.id,
              },
            });
            continue;
          }

          const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

          if (!TOKEN) {
            await tx.news.update({
              where: {
                id: article.id,
              },
              data: {
                filtered: true,
              },
            });
          } else {
            const autoApprove = !!process.env.AUTO_APPROVE_NEWS;
            let answer = "yes";
            if (autoApprove) {
              try {
                const completion = await openai.chat.completions.create({
                  model: "gpt-4o-mini",
                  messages: [
                    {
                      role: "system",
                      content: `
                    You are an assistant that classifies news. Your task is to determine if a news headline is related to technology.
                    Respond with "yes" if it is related to technology, otherwise respond with "no" and explain the reasons why it is not considered a technology news.
                  `,
                    },
                    {
                      role: "user",
                      content: `
                    Title: "${article.title}"
                    
                    Is this news related to technology?
                `,
                    },
                  ],
                  max_tokens: 10,
                  temperature: 0,
                });
                answer =
                  completion.choices[0].message.content?.trim().toLowerCase() ||
                  "yes";
              } catch (error: unknown) {
                console.error(error);
              }
            }

            if (answer.startsWith("y")) {
              let message: TelegramBot.Message | undefined;
              if (!autoApprove) {
                const bot = new TelegramBot(TOKEN);
                message = await bot.sendMessage(
                  TELEGRAM_PERSONAL_CHAT_ID,
                  `${autoApprove ? "✅" : "❔"} ${article.title}`,
                  {
                    parse_mode: "Markdown",
                    reply_markup: autoApprove
                      ? undefined
                      : {
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
              }

              await tx.news.update({
                where: {
                  id: article.id,
                },
                data: {
                  sentToApproval: true,
                  filtered: autoApprove ? true : undefined,
                  telegramChatId: message?.chat.id.toString(),
                  telegramMessageId: message?.message_id.toString(),
                },
              });
            } else {
              await tx.news.update({
                data: {
                  deletedAt: new Date(),
                  deletionReason: `Not detected as related to technology (${answer})`,
                },
                where: {
                  id: article.id,
                },
              });
            }
          }
        }

        return NextResponse.json({ success: true }, { status: 200 });
      },
      {
        timeout: 50000, // Increase timeout to 30 seconds
      },
    );
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
