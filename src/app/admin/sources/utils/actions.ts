"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteSource(sourceId: number) {
  try {
    await prisma.newsSource.delete({
      where: {
        id: sourceId,
      },
    });

    return {
      success: true,
      message: `Source con ID ${sourceId} eliminado exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al eliminar el Source con ID ${sourceId}: ${error}`,
    };
  }
}
