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

export async function updateStatus(sourceId: number) {
  try {
    const newsSource = await prisma.newsSource.findUnique({
      where: {
        id: sourceId,
      },
    });

    if (!newsSource) {
      return {
        success: false,
        message: `No se encontró ningún source con el ID ${sourceId}`,
      };
    }

    await prisma.newsSource.update({
      where: {
        id: sourceId,
      },
      data: {
        isActive: !newsSource.isActive,
      },
    });

    return {
      success: true,
      message: `Source con ID ${sourceId} actualizado exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar el Source con ID ${sourceId}: ${error}`,
    };
  }
}
