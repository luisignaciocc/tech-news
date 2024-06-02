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
    const access_token = process.env.FACEBOOK_PAGE_TOKEN;
    const pageId = process.env.FB_PAGE_ID;
    const apiVersion = process.env.FACEBOOK_API_VERSION;

    if (!access_token || !pageId || !apiVersion) {
      return NextResponse.json({
        ok: false,
        message: "No se encontró un token de acceso válido.",
      });
    }

    const lastPost = await prisma.post.findFirst({
      where: {
        postedToFacebook: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        slug: true,
      },
    });

    if (!lastPost) {
      return NextResponse.json({
        ok: false,
        message: "No se encontró una noticia válida para publicar.",
      });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            Eres un asistente que crea resúmenes concisos y atractivos para publicaciones en Faceboof. 
            Las publicaciones deben estar diseñadas para atraer la atención de los seguidores interesados en noticias de tecnología. 
            La cuenta de Facebook es un sitio de noticias de tecnología llamado Tecnobuc.
          `,
        },
        {
          role: "user",
          content: `
            Aquí tienes un artículo sobre tecnología:
            ${lastPost.content}
            
            Por favor, proporciona un resumen adecuado para una publicación en Facebook.
          `,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const summary = completion.choices[0].message.content;
    const postUrl = `${SITE_URL}/posts/${lastPost.slug}`;

    if (!summary) {
      await notifyProblem("Generating a summary for a new post on Facebook");
      return NextResponse.json({ error: "No summary found" }, { status: 404 });
    }

    const res = await fetch(
      `https://graph.facebook.com/${apiVersion}/${pageId}/feed?access_token=${access_token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: summary,
          link: postUrl,
          published: "true",
        }),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      await notifyProblem("Publishing a new post to Facebook", error);
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API" },
        { status: 500 },
      );
    }

    const {
      id,
    }: {
      id: string;
    } = await res.json();

    await prisma.post.update({
      where: {
        id: lastPost.id,
      },
      data: {
        postedToFacebook: true,
        facebookPostId: id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    await notifyProblem("Publishing a new post to Facebook");
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
