"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteNewsMany(newsIds: string[]) {
  try {
    await prisma.news.deleteMany({
      where: {
        id: {
          in: newsIds,
        },
      },
    });

    return {
      success: true,
      message: `Noticias con IDs ${newsIds.join(", ")} eliminadas exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al eliminar las noticias con IDs ${newsIds.join(", ")}: ${error}`,
    };
  }
}

export async function updateDeletedAtNullMany(newsIds: string[]) {
  try {
    await prisma.news.updateMany({
      where: {
        id: {
          in: newsIds,
        },
      },
      data: {
        deletedAt: null,
      },
    });

    return {
      success: true,
      message: `Noticias con IDs ${newsIds.join(", ")} actualizadas exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar las noticias con IDs ${newsIds.join(", ")}: ${error}`,
    };
  }
}

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

export async function updateDeletedAtNull(newsId: string) {
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
