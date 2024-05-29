import { PrismaClient } from "@prisma/client";
import cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(_request: Request): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
      where: {
        parsed: true,
        valid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        url: true,
        sourceId: true,
        parsed: true,
        valid: true,
        createdAt: true,
      },
    });

    const newsWithImages = await Promise.all(
      news.map(async (item) => {
        try {
          const response = await fetch(item.url);
          if (!response.ok) {
            return {
              url: item.url,
              sourceId: item.sourceId,
              images: [],
            };
          }
          const html = await response.text();
          const $ = cheerio.load(html);

          const images = $("img")
            .map((i, el) => $(el).attr("src"))
            .get();

          return {
            url: item.url,
            sourceId: item.sourceId,
            images,
          };
        } catch (error) {
          return {
            url: item.url,
            sourceId: item.sourceId,
            images: [],
          };
        }
      }),
    );

    return NextResponse.json(
      { success: true, news: newsWithImages },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al buscar noticias e imágenes:", error);
      return NextResponse.json(
        { error: `Error al hacer la solicitud a la API: ${error.message}` },
        { status: 500 },
      );
    } else {
      console.error("Error al buscar noticias e imágenes:", error);
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API" },
        { status: 500 },
      );
    }
  }
}
