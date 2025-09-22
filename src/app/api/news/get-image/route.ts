import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
      where: {
        vectorized: true,
        coverImage: null,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      select: {
        id: true,
        url: true,
      },
    });

    await Promise.allSettled(
      news.map(async (item) => {
        try {
          const response = await fetch(item.url);
          if (!response.ok) {
            await prisma.news.update({
              where: {
                id: item.id,
              },
              data: {
                deletedAt: new Date(),
                deletionReason: "Error fetching the news link to get the image",
              },
            });
            return false;
          }
          const html = await response.text();
          const $ = cheerio.load(html);

          let image: string | undefined;
          const ogImage = $('meta[property="og:image"]').attr("content");
          if (ogImage) {
            image = ogImage;
          } else {
            const twitterImage = $('meta[name="twitter:image"]').attr(
              "content",
            );
            if (twitterImage) {
              image = twitterImage;
            } else {
              const wpPostImage = $(".wp-post-image").attr("src");
              if (wpPostImage) {
                image = wpPostImage;
              } else {
                await prisma.news.update({
                  where: {
                    id: item.id,
                  },
                  data: {
                    deletedAt: new Date(),
                    deletionReason: "No image found in the news link",
                  },
                });
                return false;
              }
            }
          }

          // Check if the image is in WebP format
          if (image.endsWith(".webp")) {
            await prisma.news.update({
              where: {
                id: item.id,
              },
              data: {
                deletedAt: new Date(),
                deletionReason: "Image format is WebP",
              },
            });
            return false;
          }

          await prisma.news.update({
            where: {
              id: item.id,
            },
            data: {
              coverImage: image,
            },
          });

          return true;
        } catch (error) {
          console.error("Error processing news image:", item.id, error);
          try {
            await prisma.news.update({
              where: {
                id: item.id,
              },
              data: {
                deletedAt: new Date(),
                deletionReason: "Error fetching the news link to get the image",
              },
            });
          } catch (updateError) {
            console.error("Error updating news record:", item.id, updateError);
          }
          return false;
        }
      }),
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Getting images from news", error);
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
