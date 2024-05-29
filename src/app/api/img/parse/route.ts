import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
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
              mainImage: null,
            };
          }
          const html = await response.text();
          const $ = cheerio.load(html);

          //   const mainImage = $("img")
          //     .map((i, el) => $(el).attr("src"))
          //     .get();

          let mainImage: string[] | null | undefined;
          const ogImage = $('meta[property="og:image"]').attr("content");
          if (ogImage) {
            mainImage = [ogImage];
          } else {
            const twitterImage = $('meta[name="twitter:image"]').attr(
              "content",
            );
            if (twitterImage) {
              mainImage = [twitterImage];
            } else {
              const excludedExtensions = [".csv"];
              const images = $("img")
                .map((i, el) => $(el).attr("src"))
                .get()
                .filter(
                  (src) =>
                    src &&
                    src.startsWith("https") &&
                    !excludedExtensions.some((ext) => src.endsWith(ext)),
                );
              if (images.length > 0) {
                mainImage = images;
              } else {
                mainImage = null;
              }
            }
          }

          return {
            url: item.url,
            sourceId: item.sourceId,
            mainImage,
          };
        } catch (error) {
          return {
            url: item.url,
            sourceId: item.sourceId,
            mainImage: null,
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
