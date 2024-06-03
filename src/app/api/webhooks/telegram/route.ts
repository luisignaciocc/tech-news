// curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://project-name.username.vercel.app/api/webhook"}'

import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TOKEN) {
      return NextResponse.json(
        { error: "No whatsapp API keys found" },
        { status: 404 },
      );
    }

    const bot = new TelegramBot(TOKEN);

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message found" }, { status: 400 });
    }

    const {
      chat: { id },
      text,
    } = message;

    const messageResponse = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

    await bot.sendMessage(id, messageResponse, { parse_mode: "Markdown" });

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
