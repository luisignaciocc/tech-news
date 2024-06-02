import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const [article, author] = await Promise.all([
      prisma.news.findFirst({
        where: {
          parsed: true,
          valid: true,
          posts: {
            none: {},
          },
          images: {
            some: {},
          },
        },
        orderBy: {
          publishedAt: "desc",
        },
        select: {
          id: true,
          title: true,
          body: true,
          excerpt: true,
          publishedAt: true,
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
      }),
      prisma.author.findFirst({
        orderBy: {
          posts: {
            _count: "desc",
          },
        },
      }),
    ]);

    if (!article || !author) {
      return NextResponse.json({ error: "No article found" }, { status: 404 });
    }

    const bodyCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente que convierte noticias en artículos en español, en formato markdown. El artículo debe ser fiel a la noticia original pero reescrito con otras palabras y estructura, omitiendo cualquier mención directa de la fuente específica y excluyendo cualquier 'call to action' como seguir cuentas en redes sociales o suscribirse a newsletters.",
        },
        {
          role: "user",
          content: `Reescribe la siguiente noticia en un artículo de formato markdown: ${article.body}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const body = bodyCompletion.choices[0].message.content;

    if (!body) {
      await notifyProblem("retrieving the body of the article from OpenAI");
      return NextResponse.json({ error: "No body found" }, { status: 404 });
    }

    const [titleCompletion, excerptCompletion] = await Promise.all([
      openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente que reescribe títulos de noticias en español, omitiendo cualquier mención de la fuente y reestructurando el título con otras palabras.",
          },
          {
            role: "user",
            content: `Reescribe el siguiente título en español: ${article.title}`,
          },
        ],
        model: "gpt-3.5-turbo",
      }),
      openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente que reescribe resúmenes de noticias en español, omitiendo cualquier mención de la fuente y reestructurando el contenido con otras palabras.",
          },
          {
            role: "user",
            content: `Reescribe el siguiente resumen en español: ${article.excerpt}`,
          },
        ],
        model: "gpt-3.5-turbo",
      }),
    ]);

    const title = titleCompletion.choices[0].message.content || article.title;
    const excerpt = excerptCompletion.choices[0].message.content;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    await prisma.post.create({
      data: {
        title: title,
        content: body,
        excerpt: excerpt || article.excerpt,
        author: {
          connect: {
            id: author.id,
          },
        },
        slug,
        new: {
          connect: {
            id: article.id,
          },
        },
        coverImage: article.images[0].url,
        publishedAt: article.publishedAt,
      },
    });

    revalidatePath(`/`);
    revalidatePath(`/record/[page]/page`, "page");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Publishing a new post to the blog", error);
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
