"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateDeletedAt(newsId: string) {
  try {
    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: `Noticia con ID ${newsId} actualizada exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar la noticia con ID ${newsId}: ${error}`,
    };
  }
}

export async function updateFiltered(newsId: string) {
  try {
    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        filtered: true,
      },
    });

    return {
      success: true,
      message: `Noticia con ID ${newsId} actualizada exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar la noticia con ID ${newsId}: ${error}`,
    };
  }
}
