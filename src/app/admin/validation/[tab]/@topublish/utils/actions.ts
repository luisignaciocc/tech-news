"use server";
import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";

const prisma = new PrismaClient();

export async function updateDeletedAtNotNullMany(newsIds: string[]) {
  try {
    await prisma.news.updateMany({
      where: {
        id: {
          in: newsIds,
        },
      },
      data: {
        deletedAt: new Date(),
        deletionReason: `Not approved by *Admin*`,
      },
    });

    return {
      success: true,
      message: `Noticias con IDs ${newsIds.join(", ")} actualizadas exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar las noticias con IDs ${newsIds.join(", ")}: ${error}`,
    };
  }
}

export async function updateFilteredTrueMany(newsIds: string[]) {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TOKEN) {
    console.error("No telegram API keys found");
    return {
      success: false,
      message: `No telegram API keys found`,
    };
  }

  const bot = new TelegramBot(TOKEN);

  try {
    const [articles, filteredNews] = await Promise.all([
      prisma.news.findMany({
        where: {
          id: {
            in: newsIds,
          },
        },
      }),
      prisma.news.count({
        where: {
          filtered: true,
          posts: {
            none: {},
          },
        },
      }),
    ]);

    const promises: Promise<unknown>[] = [
      prisma.news.updateMany({
        where: {
          id: {
            in: newsIds,
          },
        },
        data: {
          filtered: true,
        },
      }),
    ];

    for (const article of articles) {
      if (article.telegramChatId && article.telegramMessageId) {
        promises.push(
          bot.editMessageReplyMarkup(
            { inline_keyboard: [] },
            {
              chat_id: article.telegramChatId,
              message_id: +article.telegramMessageId,
            },
          ),
        );
        promises.push(
          bot.editMessageText(`✅ (${filteredNews + 1}) ${article.title}`, {
            chat_id: article.telegramChatId,
            message_id: +article.telegramMessageId,
            parse_mode: "Markdown",
          }),
        );
      }
    }

    await Promise.all(promises);

    return {
      success: true,
      message: `Noticias con IDs ${newsIds.join(", ")} actualizadas exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar las noticias con IDs ${newsIds.join(", ")}: ${error}`,
    };
  }
}

export async function updateDeletedAtNotNull(newsId: string) {
  try {
    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        deletedAt: new Date(),
        deletionReason: `Not approved by *Admin*`,
      },
    });

    return {
      success: true,
      message: `Noticia con ID ${newsId} actualizada exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar la noticia con ID ${newsId}: ${error}`,
    };
  }
}

export async function updateFilteredTrue(newsId: string) {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TOKEN) {
    console.error("No telegram API keys found");
    return {
      success: false,
      message: `No telegram API keys found`,
    };
  }

  const bot = new TelegramBot(TOKEN);
  try {
    const [article, filteredNews] = await Promise.all([
      prisma.news.findUnique({
        where: {
          id: newsId,
        },
      }),
      prisma.news.count({
        where: {
          filtered: true,
          posts: {
            none: {},
          },
        },
      }),
    ]);

    if (!article) {
      return {
        success: false,
        message: `No se encontró la noticia con ID ${newsId}`,
      };
    }

    const promises: Promise<unknown>[] = [
      prisma.news.update({
        where: {
          id: newsId,
        },
        data: {
          filtered: true,
        },
      }),
    ];

    if (article.telegramChatId && article.telegramMessageId) {
      promises.push(
        bot.editMessageReplyMarkup(
          { inline_keyboard: [] },
          {
            chat_id: article.telegramChatId,
            message_id: +article.telegramMessageId,
          },
        ),
      );
      promises.push(
        bot.editMessageText(`✅ (${filteredNews + 1}) ${article.title}`, {
          chat_id: article.telegramChatId,
          message_id: +article.telegramMessageId,
          parse_mode: "Markdown",
        }),
      );
    }
    await Promise.all(promises);

    return {
      success: true,
      message: `Noticia con ID ${newsId} actualizada exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar la noticia con ID ${newsId}: ${error}`,
    };
  }
}
