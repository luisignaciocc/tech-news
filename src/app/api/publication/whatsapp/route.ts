import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { SITE_URL } from "@/lib/metadata";

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
          title: true,
          slug: true,
          postedToFacebook: true,
          postedToInstagram: true,
          postedToLinkedin: true,
          postedToTwitter: true,
        },
      }),
    ]);

    if (!article) {
      return NextResponse.json({ error: "No article found" }, { status: 404 });
    }

    const API_KEY = process.env.CALLMEBOT_API_KEY;
    const PHONE = process.env.WHATSAPP_PHONE;

    if (!API_KEY || !PHONE) {
      return NextResponse.json(
        { error: "No whatsapp API keys found" },
        { status: 404 },
      );
    }

    const postUrl = `${SITE_URL}/posts/${article.slug}`;
    const text = `*Nuevo artículo publicado* 🚀
${article.title} ${postUrl}
Publicado en Facebook ${article.postedToFacebook ? "✅" : "❌"}
Publicado en Instagram ${article.postedToInstagram ? "✅" : "❌"}
Publicado en Linkedin ${article.postedToLinkedin ? "✅" : "❌"}
Publicado en Twitter ${article.postedToTwitter ? "✅" : "❌"}`;

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
