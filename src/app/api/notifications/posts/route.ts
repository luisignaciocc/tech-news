import { PrismaClient } from "@prisma/client";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { NextResponse } from "next/server";

import { SITE_URL } from "@/lib/metadata";

const prisma = new PrismaClient();

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
          postedToInstagram: true,
          postedToLinkedin: true,
          postedToTwitter: true,
          createdAt: true,
        },
        take: 10,
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

    let text = "*Últimos artículos publicados* 🚀";
    text += "\n";
    text = `Última publicación: ${formatDistance(
      new Date(articles[0].createdAt),
      new Date(),
      { addSuffix: true, locale: es },
    )}`;

    for (const article of articles) {
      const postUrl = `${SITE_URL}/posts/${article.slug}`;
      text += "\n\n";
      text += `${postUrl}`;
      text += "\n";
      text += `Facebook ${article.postedToFacebook ? "✅" : "❌"}\n`;
      text += `Instagram ${article.postedToInstagram ? "✅" : "❌"}\n`;
      text += `Linkedin ${article.postedToLinkedin ? "✅" : "❌"}\n`;
      text += `Twitter ${article.postedToTwitter ? "✅" : "❌"}`;
    }

    const encodedText = encodeURIComponent(text);

    const endpointURL = `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encodedText}&apikey=${API_KEY}`;

    const response = await fetch(endpointURL);

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
