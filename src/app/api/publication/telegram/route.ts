import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

import { SITE_URL } from "@/lib/metadata";
import { TELEGRAM_CHANNEL_ID } from "@/lib/telegram";
import { notifyProblem, toBase62 } from "@/lib/utils";

const prisma = new PrismaClient();

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const [article] = await Promise.all([
      prisma.post.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          instagramMediaId: true,
          tweetId: true,
          linkedinPostId: true,
          facebookPostId: true,
        },
      }),
    ]);

    if (!article) {
      return NextResponse.json({ error: "No article found" }, { status: 404 });
    }

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!TOKEN) {
      return NextResponse.json(
        { error: "No Telegram token found" },
        { status: 404 },
      );
    }

    const bot = new TelegramBot(TOKEN);

    const postUrl = `${SITE_URL}/posts/${article.slug}`;

    let text = `📰Nuevo post: [${article.title}](${postUrl})\n\n`;

    if (article.facebookPostId) {
      text += `[Facebook](https://www.facebook.com/${article.facebookPostId})\n`;
    }

    if (article.instagramMediaId) {
      const instagramId = toBase62(+article.instagramMediaId);
      text += `[Instagram](https://www.instagram.com/p/${instagramId})\n`;
    }

    if (article.linkedinPostId) {
      text += `[Linkedin](https://www.linkedin.com/feed/update/${article.linkedinPostId})\n`;
    }

    if (article.tweetId) {
      text += `[Twitter](https://twitter.com/i/web/status/${article.tweetId})`;
    }

    await bot.sendMessage(TELEGRAM_CHANNEL_ID, text, {
      parse_mode: "Markdown",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Publishing a new post to Twitter");
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
