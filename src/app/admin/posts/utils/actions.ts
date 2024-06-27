"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deletedPostUpdateNews(postId: string, newId: string) {
  try {
    await Promise.all([
      prisma.post.delete({
        where: {
          id: postId,
        },
      }),

      prisma.news.update({
        where: {
          id: newId,
        },
        data: {
          filtered: false,
          deletedAt: new Date(),
          deletionReason: "Deleted after being published",
        },
      }),
    ]);

    return {
      success: true,
      message: `Post con ID ${postId} eliminado exitosamente y Noticia correspondiente actualizada.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al eliminar el Post con ID ${postId}: ${error}`,
    };
  }
}
