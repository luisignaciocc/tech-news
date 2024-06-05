// curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://project-name.username.vercel.app/api/webhook"}'

import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

const _GROUP_CHAT_ID = -4283664751;
const _BOT_ID = 7206845707;
const _PERSONAL_CHAT_ID = 735341022;

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TOKEN) {
      return NextResponse.json(
        { error: "No telegram API keys found" },
        { status: 404 },
      );
    }

    const bot = new TelegramBot(TOKEN);

    const body = await req.json();

    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const data = callbackQuery.data;
      const message = callbackQuery.message;

      const [type, action] = data.split(":");

      if (type !== "approve") {
        await bot.sendMessage(
          _PERSONAL_CHAT_ID,
          `*${JSON.stringify(body, null, 2)}*`,
          { parse_mode: "Markdown" },
        );
      }

      await bot.editMessageReplyMarkup(
        { inline_keyboard: [] },
        {
          chat_id: message.chat.id,
          message_id: message.message_id,
        },
      );

      if (action === "accept") {
        await bot.sendMessage(message.chat.id, "Has aceptado.");
      } else if (action === "cancel") {
        await bot.sendMessage(message.chat.id, "Has cancelado.");
      }

      await bot.answerCallbackQuery(callbackQuery.id);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!body?.message) {
      await bot.sendMessage(
        _PERSONAL_CHAT_ID,
        `${JSON.stringify(body, null, 2)}*`,
        { parse_mode: "Markdown" },
      );
    }

    const {
      chat: { id },
      text,
      from: { username },
    } = body.message;

    if (text && username === "luisignaciocc") {
      const messageResponse = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;
      await bot.sendMessage(id, messageResponse, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Aceptar",
                callback_data: "approve:accept",
              },
              {
                text: "Cancelar",
                callback_data: "approve:cancel",
              },
            ],
          ],
        },
      });
    } else {
      await bot.sendMessage(
        _PERSONAL_CHAT_ID,
        `${JSON.stringify(body, null, 2)}*`,
        { parse_mode: "Markdown" },
      );
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
