import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";

import { TELEGRAM_PERSONAL_CHAT_ID } from "@/lib/telegram";
import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

const _SIMILARITY_THRESHOLD = 0.8;
const bannedWords = [
  "wordle",
  "quordle",
  "nyt",
  "review",
  "deal",
  "apk teardown",
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
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
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
        AND n.embedding IS NOT NULL
        ORDER BY similarity DESC
        LIMIT 1;
      `;

      if (similarNews[0].similarity > _SIMILARITY_THRESHOLD) {
        await prisma.news.update({
          data: {
            deletedAt: new Date(),
            deletionReason: `Similar to ${similarNews[0].id} (${similarNews[0].similarity})`,
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
              deletionReason: `Contains banned word`,
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
                      Do not consider reviews, opinion pieces, historical articles, deals, guides and tutorials, or articles related to movies, series, comics, or TV as technology news.
                      If the headline refers to more than one topic, do not consider it as a technology news.
                      If the headline is about a drop in the price of a product, do not consider it as a technology news.
                      If the headline is about a startup valuation, aquisition, or funding, do not consider it as a technology news.
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
              const bot = new TelegramBot(TOKEN);
              const message = await bot.sendMessage(
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

              await prisma.news.update({
                where: {
                  id: article.id,
                },
                data: {
                  sentToApproval: true,
                  filtered: autoApprove ? true : undefined,
                  telegramChatId: message.chat.id.toString(),
                  telegramMessageId: message.message_id.toString(),
                },
              });
            } else {
              await prisma.news.update({
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
