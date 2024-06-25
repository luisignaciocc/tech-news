import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { SITE_URL } from "@/lib/metadata";
import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const access_token = process.env.FACEBOOK_LONG_LIVE_TOKEN;
    const igUserId = process.env.IG_PAGE_ID;
    const apiVersion = process.env.FACEBOOK_API_VERSION;

    if (!access_token || !igUserId || !apiVersion) {
      return NextResponse.json({
        ok: false,
        message: "No se encontró un token de acceso válido.",
      });
    }

    const lastPost = await prisma.post.findFirst({
      where: {
        postedToInstagram: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        coverImage: true,
        content: true,
      },
    });

    if (!lastPost) {
      return NextResponse.json({
        ok: false,
        message:
          "No se encontró una noticia válida para generar la descripción.",
      });
    }

    const titleUrlEncoded = encodeURIComponent(lastPost.title);
    const coverImageUrlEncoded = encodeURIComponent(
      lastPost.coverImage || `${SITE_URL}/icon.png`,
    );

    const imageTemplates = ["image-01"];

    const randomImageTemplate =
      imageTemplates[Math.floor(Math.random() * imageTemplates.length)];

    const imageUrl = `${SITE_URL}/api/instagram/${randomImageTemplate}?title=${titleUrlEncoded}&cover_image=${coverImageUrlEncoded}&api_key=${process.env.API_KEY}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            Eres un asistente que crea resúmenes concisos y atractivos para publicaciones en Instagram. 
            Las publicaciones deben estar diseñadas para atraer la atención de los seguidores interesados en noticias de tecnología. 
            La cuenta de Instagram es un sitio de noticias de tecnología llamado Tecnobuc.
            Solo responde con el texto del resumen, sin ninguna introducción o comentario adicional.
          `,
        },
        {
          role: "user",
          content: `
            Aquí tienes un artículo sobre tecnología:
            ${lastPost.content}
            
            Por favor, proporciona un resumen adecuado para una publicación en Instagram.
          `,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const summary = completion.choices[0].message.content;

    if (!summary) {
      await notifyProblem("Generating a summary for a new post on Instagram");
      return NextResponse.json({ error: "No summary found" }, { status: 404 });
    }

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          image_url: imageUrl || "",
          caption: summary || "",
          access_token,
        }),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      await notifyProblem("Creating a new media on Instagram", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const {
      id: creation_id,
    }: {
      id: string;
    } = await res.json();

    const res2 = await fetch(
      `https://graph.facebook.com/${apiVersion}/${igUserId}/media_publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          creation_id,
          access_token,
        }),
      },
    );

    const {
      id: media_id,
    }: {
      id: string;
    } = await res2.json();

    await prisma.post.update({
      where: {
        id: lastPost.id,
      },
      data: {
        postedToInstagram: true,
        instagramMediaId: media_id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    await notifyProblem("Publishing a new post to Instagram");
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al hacer la solicitud a la API: ${error.message}` },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          error: "Error al hacer la solicitud a la API",
        },
        { status: 500 },
      );
    }
  }
}
