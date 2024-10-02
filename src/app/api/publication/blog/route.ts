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
          filtered: true,
          posts: {
            none: {},
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
          coverImage: true,
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
          content: `
            Eres un asistente que convierte noticias en artículos en español, en formato markdown. 
            El artículo debe ser fiel a la noticia original pero reescrito con otras palabras y estructura, 
            omitiendo cualquier mención directa de la fuente específica y excluyendo cualquier 'call to action' 
            como seguir cuentas en redes sociales o suscribirse a newsletters. 
            No incluyas un título al comienzo del artículo.
            No traduzcas ni modifiques los nombres propios, marcas o nombres de entidades.
            Al final del artículo, dentro de <!-- tags: -->, 
            genera una lista de 3 etiquetas (tags) relevantes relacionadas con el contenido del artículo, 
            proporcionando cada etiqueta en español y en inglés, 
            separadas por un guion. Por ejemplo: "Etiqueta en español - Tag in English".
          `,
        },
        {
          role: "user",
          content: `Reescribe la siguiente noticia en un artículo de formato markdown, sin incluir un título: ${article.body}`,
        },
      ],
      model: "gpt-4o-mini",
    });

    const body = bodyCompletion.choices[0].message.content;

    if (!body) {
      await notifyProblem("retrieving the body of the article from OpenAI");
      return NextResponse.json({ error: "No body found" }, { status: 404 });
    }

    // Regex to capture the tags
    const tagsRegex = /<!-- tags: -->([\s\S]*?)$/;
    const tagsMatch = body.match(tagsRegex);
    const tags = tagsMatch
      ? tagsMatch[1]
          .trim()
          .split(/\n/) // Split by new lines
          .map((tag) => tag.trim().replace(/^-\s*/, "")) // Remove the '-' character at the beginning
          .filter((tag) => tag !== "") // Filter empty values
          .map((tag) => {
            const [nameEn, nameEs] = tag.split(" - ").map((t) => t.trim()); // Separate tags
            return { nameEs, nameEn }; // Return an object with both tags
          })
      : [];

    const articleMarkdown = body.replace(tagsRegex, "").trim();

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
            content: `Reescribe el siguiente título en español: ${article.title.split(" - ")[0]}`,
          },
        ],
        model: "gpt-4o-mini",
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
        model: "gpt-4o-mini",
      }),
    ]);

    const titleEs = titleCompletion.choices[0].message.content || article.title;
    const excerptEs = excerptCompletion.choices[0].message.content;

    // Translation to English
    const [titleEnCompletion, excerptEnCompletion, bodyEnCompletion] =
      await Promise.all([
        openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Eres un asistente que traduce texto al inglés.",
            },
            {
              role: "user",
              content: `Traduce al inglés el siguiente título: ${titleEs}`,
            },
          ],
          model: "gpt-4o-mini",
        }),
        openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Eres un asistente que traduce texto al inglés.",
            },
            {
              role: "user",
              content: `Traduce al inglés el siguiente resumen: ${excerptEs}`,
            },
          ],
          model: "gpt-4o-mini",
        }),
        openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Eres un asistente que traduce texto al inglés.",
            },
            {
              role: "user",
              content: `Traduce al inglés el siguiente contenido: ${articleMarkdown}`,
            },
          ],
          model: "gpt-4o-mini",
        }),
      ]);

    const titleEn = titleEnCompletion.choices[0].message.content || "";
    const excerptEn = excerptEnCompletion.choices[0].message.content || "";
    const bodyEn = bodyEnCompletion.choices[0].message.content || "";

    // Save slug in English
    const slug = titleEn
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const post = await prisma.post.create({
      data: {
        title: titleEs,
        content: articleMarkdown,
        excerpt: excerptEs || article.excerpt,
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
        coverImage: article.coverImage,
        publishedAt: article.publishedAt,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: {
              nameEn: tag.nameEn.toLowerCase(), // Use nameEn to search
            },
            create: {
              nameEs: tag.nameEs.toLowerCase(), // Create the name in Spanish
              nameEn: tag.nameEn.toLowerCase(), // Create the name in English
            },
          })),
        },
      },
    });

    // Register translations in the Languages table
    await Promise.all([
      prisma.languages.create({
        data: {
          title: titleEs,
          content: articleMarkdown,
          excerpt: excerptEs || article.excerpt,
          locale: "es",
          postId: post.id,
        },
      }),
      prisma.languages.create({
        data: {
          title: titleEn,
          content: bodyEn,
          excerpt: excerptEn || excerptEs || article.excerpt,
          locale: "en",
          postId: post.id,
        },
      }),
    ]);

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
