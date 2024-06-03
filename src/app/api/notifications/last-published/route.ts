import { PrismaClient } from "@prisma/client";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

import { SITE_URL } from "@/lib/metadata";

const prisma = new PrismaClient();

const _CHANNEL_ID = -1002155916238;

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const [articles] = await Promise.all([
      prisma.post.findMany({
        where: {},
        orderBy: {
          createdAt: "desc",
        },
        select: {
          slug: true,
          postedToFacebook: true,
          facebookPostId: true,
          postedToInstagram: true,
          instagramMediaId: true,
          postedToLinkedin: true,
          postedToTwitter: true,
          tweetId: true,
          createdAt: true,
        },
        take: 4,
      }),
    ]);

    if (!articles.length) {
      return NextResponse.json({ error: "No articles found" }, { status: 404 });
    }

    const API_KEY = process.env.CALLMEBOT_API_KEY;
    const PHONE = process.env.WHATSAPP_PHONE;

    if (!API_KEY || !PHONE) {
      return NextResponse.json(
        { error: "No whatsapp API keys found" },
        { status: 404 },
      );
    }

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TOKEN) {
      return NextResponse.json(
        { error: "No telegram API keys found" },
        { status: 404 },
      );
    }

    const bot = new TelegramBot(TOKEN);

    let text = "*Últimos artículos publicados* 🚀";
    text += "\n";
    text += `Última publicación: ${formatDistance(
      new Date(articles[0].createdAt),
      new Date(),
      { addSuffix: true, locale: es },
    )}`;

    for (const article of articles) {
      const postUrl = `${SITE_URL}/posts/${article.slug}`;
      text += "\n\n";
      text += `${postUrl}`;
      text += "\n";
      text += `Facebook ${article.postedToFacebook && article.facebookPostId ? "✅" : "❌"}\n`;
      text += `Instagram ${article.postedToInstagram && article.instagramMediaId ? "✅" : "❌"}\n`;
      text += `Linkedin ${article.postedToLinkedin ? "✅" : "❌"}\n`;
      text += `Twitter ${article.postedToTwitter && article.tweetId ? "✅" : "❌"}`;
    }

    const encodedText = encodeURIComponent(text);

    const [response] = await Promise.all([
      fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encodedText}&apikey=${API_KEY}`,
      ),
      bot.sendMessage(_CHANNEL_ID, text, { parse_mode: "Markdown" }),
    ]);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API" },
        { status: 500 },
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
