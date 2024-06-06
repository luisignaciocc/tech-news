// curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://project-name.username.vercel.app/api/webhook"}'

import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";

const _GROUP_CHAT_ID = -4283664751;
const _BOT_ID = 7206845707;
export const TELEGRAM_CHANNEL_ID = -1002155916238;
export const TELEGRAM_PERSONAL_CHAT_ID = 735341022;

const allowedUsers = ["luisignaciocc"];

export const webhook = async (req: Request) => {
  try {
    const prisma = new PrismaClient();
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TOKEN) {
      return console.error("No telegram API keys found");
    }

    const bot = new TelegramBot(TOKEN);

    const body = await req.json();

    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const data = callbackQuery.data;
      const message = callbackQuery.message;

      const [type, action, id] = data.split(":");

      if (type !== "approve") {
        await bot.sendMessage(
          TELEGRAM_PERSONAL_CHAT_ID,
          `*${JSON.stringify(body, null, 2)}*`,
          { parse_mode: "Markdown" },
        );
        return;
      }

      if (!id) {
        await bot.sendMessage(
          TELEGRAM_PERSONAL_CHAT_ID,
          `*${JSON.stringify(body, null, 2)}*`,
          { parse_mode: "Markdown" },
        );
        return;
      }

      await bot.answerCallbackQuery(callbackQuery.id);

      if (action === "accept") {
        const [filteredNews] = await Promise.all([
          prisma.news.count({
            where: {
              filtered: true,
              posts: {
                none: {},
              },
            },
          }),
          prisma.news.update({
            where: {
              id: id,
            },
            data: {
              filtered: true,
            },
          }),
          bot.editMessageReplyMarkup(
            { inline_keyboard: [] },
            {
              chat_id: message.chat.id,
              message_id: message.message_id,
            },
          ),
        ]);
        await bot.editMessageText(
          `${message.text.replace(/^./, `✅ (${filteredNews + 1})`)}`,
          {
            chat_id: message.chat.id,
            message_id: message.message_id,
            parse_mode: "Markdown",
          },
        );
      } else if (action === "delete") {
        await prisma.news.update({
          data: {
            deletedAt: new Date(),
          },
          where: {
            id: id,
          },
        });
        bot.editMessageReplyMarkup(
          { inline_keyboard: [] },
          {
            chat_id: message.chat.id,
            message_id: message.message_id,
          },
        ),
          await bot.editMessageText(`${message.text.replace(/^./, "❌")}`, {
            chat_id: message.chat.id,
            message_id: message.message_id,
            parse_mode: "Markdown",
          });
      }
    } else if (!body?.message) {
      console.error("No message found", `${JSON.stringify(body, null, 2)}`);
    } else {
      const {
        chat: { id },
        text,
        from: { username },
      } = body.message;

      if (!text) {
        console.error("No text found", `${JSON.stringify(body, null, 2)}`);
      } else if (allowedUsers.includes(username)) {
        await bot.sendMessage(id, `👋🏻 Hola *${username}*\nBuen día!`);
      } else {
        console.error("User not allowed", `${JSON.stringify(body, null, 2)}`);
        await bot.sendMessage(
          id,
          `🚫 Lo siento, no tienes permisos para enviar mensajes a este bot.`,
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};
