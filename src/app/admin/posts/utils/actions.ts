"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deletedPostUpdateNews(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        newId: true,
      },
    });

    if (!post || !post.newId) {
      return {
        success: false,
        message: `No se encontró una noticia asociada al Post con ID ${postId}`,
      };
    }

    await Promise.all([
      prisma.post.delete({
        where: {
          id: postId,
        },
      }),

      prisma.news.update({
        where: {
          id: post.newId,
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

export async function deletedPostUpdateNewsMany(postsIds: string[]) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: postsIds,
        },
      },
      select: {
        newId: true,
      },
    });

    const newsIds = posts.map((post) => post.newId).filter(Boolean) as string[];

    await Promise.all([
      prisma.post.deleteMany({
        where: {
          id: {
            in: postsIds,
          },
        },
      }),

      prisma.news.updateMany({
        where: {
          id: {
            in: newsIds,
          },
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
      message: `Posts eliminados exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al eliminar los Posts: ${error}`,
    };
  }
}
