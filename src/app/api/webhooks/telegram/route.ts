// curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://project-name.username.vercel.app/api/webhook"}'

import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

const _GROUP_CHAT_ID = -4283664751;
const _PERSONAL_CHAT_ID = 735341022;

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

    const body: {
      updateid: number;
      message: {
        messageid: number;
        from: {
          id: number;
          isbot: boolean;
          firstname: string;
          username: string;
          languagecode: string;
        };
        senderchat?: {
          id: number;
          title: string;
          type: "supergroup";
        };
        chat: {
          id: number;
          title: string;
          type: "group" | "supergroup";
          allmembersareadministrators: boolean;
        };
        date: number;
        groupchatcreated: boolean;
        newchatphoto?: {
          file_id: string;
          file_unique_id: string;
          file_size: number;
          width: number;
          height: number;
        }[];
        text?: string;
      };
    } = await req.json();

    if (!body?.message) {
      return NextResponse.json({ error: "No message found" }, { status: 400 });
    }

    const {
      chat: { id },
      text,
      from: { username },
    } = body.message;

    if (text && username === "luisignaciocc") {
      const messageResponse = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;
      await bot.sendMessage(id, messageResponse, { parse_mode: "Markdown" });
    } else {
      await bot.sendMessage(
        _GROUP_CHAT_ID,
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
