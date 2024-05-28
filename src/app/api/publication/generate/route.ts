import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

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
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          body: true,
          excerpt: true,
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

    const bodyPrompt = `Give an article in Spanish from the following news: ${article.body}. The article should be formatted in markdown, without the title.`;

    const bodyCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: bodyPrompt }],
      model: "gpt-3.5-turbo",
    });

    const body = bodyCompletion.choices[0].message.content;

    if (!body) {
      return NextResponse.json({ error: "No body found" }, { status: 404 });
    }

    const titlePrompt = `Give me a title in spanish for the following text: ${body}`;
    const excerptPrompt = `Give me an excerpt in spanish for the following article: ${body}`;

    const [titleCompletion, excerptCompletion] = await Promise.all([
      openai.chat.completions.create({
        messages: [{ role: "user", content: titlePrompt }],
        model: "gpt-3.5-turbo",
      }),
      openai.chat.completions.create({
        messages: [{ role: "user", content: excerptPrompt }],
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
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al hacer la solicitud a la API: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API" },
        { status: 500 }
      );
    }
  }
}
