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

    const lastPosts = await prisma.post.findMany({
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
      take: 10,
    });

    if (!lastPosts.length) {
      return NextResponse.json({
        ok: false,
        message:
          "No se encontró una noticia válida para generar la descripción.",
      });
    }

    const creationIds = [];
    const articlesIds = [];
    let articles = "";
    let idx = 1;
    for (const lastPost of lastPosts) {
      const coverImageUrlEncoded = encodeURIComponent(
        lastPost.coverImage || `${SITE_URL}/icon.png`,
      );

      const imageTemplates = [
        // "image-01",
        // "image-02",
        // "image-03",
        // "image-04",
        // "image-05",
        // "image-06",
        // "image-07",
        // "image-08",
        // "image-09",
        "image-10",
      ];

      const randomImageTemplate =
        imageTemplates[Math.floor(Math.random() * imageTemplates.length)];

      const [completionTitle] = await Promise.all([
        openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `
            Eres un asistente que crea titulos concisos y atractivos a partir de un artículo. 
            Los titulos deben tener máximo 90 caracteres
            Solo responde con el titulo del artículo, sin ninguna introducción o comentario adicional.
          `,
            },
            {
              role: "user",
              content: `
            Aquí tienes un artículo sobre tecnología:
            ${lastPost.content}
            
            Por favor, proporciona un titulo adecuado.
          `,
            },
          ],
          model: "gpt-4o-mini",
        }),
      ]);

      const title =
        completionTitle?.choices?.[0]?.message?.content || lastPost.title;
      const titleUrlEncoded = encodeURIComponent(title.replaceAll(`"`, ""));

      const imageUrl = `${SITE_URL}/api/instagram/${randomImageTemplate}?title=${titleUrlEncoded}&cover_image=${coverImageUrlEncoded}&api_key=${process.env.API_KEY}`;

      const res = await fetch(
        `https://graph.facebook.com/v19.0/${igUserId}/media`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            image_url: imageUrl,
            is_carousel_item: "true",
            access_token,
          }),
        },
      );

      if (!res.ok) {
        continue;
      }

      const {
        id,
      }: {
        id: string;
      } = await res.json();
      creationIds.push(id);
      articlesIds.push(lastPost.id);
      articles += `${idx}. ${title}\n`;
      idx++;
    }

    const completionDescription = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
        Eres un asistente que crea descripciones concisas y atractivas para publicaciones en Instagram. 
        Las publicaciones deben estar diseñadas para atraer la atención de los seguidores interesados en noticias de tecnología. 
        La cuenta de Instagram es un sitio de noticias de tecnología llamado Tecnobuc.
        La publicacion consiste de varias noticias de tecnología en un carrusel, así que se te proporcionarán varior artículos y deberás crear una descripción general para el carrusel.
        Solo responde con el texto del resumen, sin ninguna introducción o comentario adicional.
      `,
        },
        {
          role: "user",
          content: `
        Aquí tienes varios artículos sobre tecnología:
        ${articles}
        
        Por favor, proporciona un resumen adecuado para una publicación en Instagram.
      `,
        },
      ],
      model: "gpt-4o-mini",
    });

    const caption =
      completionDescription.choices[0].message.content ||
      "Las últimas noticias de tecnología en Tecnobuc";

    const res2 = await fetch(
      `https://graph.facebook.com/${apiVersion}/${igUserId}/media_publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          access_token,
          media_type: "CAROUSEL",
          children: creationIds.join(","),
          caption,
        }),
      },
    );

    const {
      id: media_id,
    }: {
      id: string;
    } = await res2.json();

    await prisma.post.updateMany({
      where: {
        id: {
          in: articlesIds,
        },
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
