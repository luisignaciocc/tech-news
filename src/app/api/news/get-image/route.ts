import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const imagesFilter = [".svg"];

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    return NextResponse.json({
      ok: false,
      message: "Cloudinary credentials not found",
    });
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });

  try {
    const prisma = new PrismaClient();

    const news = await prisma.news.findMany({
      where: {
        parsed: true,
        valid: true,
        images: {
          none: {},
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        url: true,
      },
    });

    await Promise.all(
      news.map(async (item) => {
        try {
          const response = await fetch(item.url);
          if (!response.ok) {
            return false;
          }
          const html = await response.text();
          const $ = cheerio.load(html);

          let images: string[] | undefined;
          const ogImage = $('meta[property="og:image"]').attr("content");
          if (ogImage) {
            images = [ogImage];
          } else {
            const twitterImage = $('meta[name="twitter:image"]').attr(
              "content",
            );
            if (twitterImage) {
              images = [twitterImage];
            } else {
              const imgs = $("img")
                .map((_i, el) => $(el).attr("src"))
                .get()
                .filter(
                  (src) =>
                    src &&
                    src.startsWith("https") &&
                    !imagesFilter.some((sub) => src.includes(sub)),
                );
              if (imgs.length > 0) {
                images = imgs;
              }
            }
          }

          if (!images) {
            return false;
          }

          const imageUrls = await Promise.all(
            images.map(async (image) => {
              const result = await cloudinary.uploader.upload(image, {
                folder: "posts_previews",
              });

              return result.secure_url;
            }),
          );

          await prisma.news.update({
            where: {
              id: item.id,
            },
            data: {
              images: {
                createMany: {
                  data: imageUrls.map((url) => ({ url })),
                },
              },
            },
          });

          return true;
        } catch (error) {
          return false;
        }
      }),
    );

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
