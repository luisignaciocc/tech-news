import { PrismaClient } from "@prisma/client";
import * as cheerio from "cheerio";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

// Initialize Prisma Client as a singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

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
    return await prisma.$transaction(
      async (tx) => {
        const news = await tx.news.findMany({
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

        if (news.length === 0) {
          return NextResponse.json({ success: true }, { status: 200 });
        }

        const results = await Promise.all(
          news.map(async (item) => {
            try {
              const response = await fetch(item.url);
              if (!response.ok) {
                return {
                  id: item.id,
                  action: "delete" as const,
                  reason: "Error fetching the news link to get the image",
                };
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
                    return {
                      id: item.id,
                      action: "delete" as const,
                      reason: "No image found in the news link",
                    };
                  }
                }
              }

              // Check if the image is in WebP format
              if (image.endsWith(".webp")) {
                return {
                  id: item.id,
                  action: "delete" as const,
                  reason: "Image format is WebP",
                };
              }

              const imageUrl = await cloudinary.uploader.upload(image, {
                folder: "posts_previews",
              });

              return {
                id: item.id,
                action: "update" as const,
                coverImage: imageUrl.secure_url,
              };
            } catch (error) {
              return {
                id: item.id,
                action: "delete" as const,
                reason: "Error fetching the news link to get the image",
              };
            }
          }),
        );

        // Batch process updates and deletes
        const toUpdate = results.filter((r) => r.action === "update");
        const toDelete = results.filter((r) => r.action === "delete");

        if (toUpdate.length > 0) {
          await tx.news.updateMany({
            where: {
              id: {
                in: toUpdate.map((item) => item.id),
              },
            },
            data: {
              coverImage: toUpdate[0].coverImage,
            },
          });
        }

        if (toDelete.length > 0) {
          await tx.news.updateMany({
            where: {
              id: {
                in: toDelete.map((item) => item.id),
              },
            },
            data: {
              deletedAt: new Date(),
              deletionReason: toDelete[0].reason,
            },
          });
        }

        return NextResponse.json({ success: true }, { status: 200 });
      },
      {
        timeout: 30000, // Aumentar timeout a 30 segundos
      },
    );
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
