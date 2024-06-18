"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteNews(newsId: string) {
  try {
    await prisma.news.delete({
      where: {
        id: newsId,
      },
    });

    return {
      success: true,
      message: `Noticia con ID ${newsId} eliminada exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al eliminar la noticia con ID ${newsId}: ${error}`,
    };
  }
}

export async function updateDeletedAt(newsId: string) {
  try {
    await prisma.news.update({
      where: {
        id: newsId,
      },
      data: {
        deletedAt: null,
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
