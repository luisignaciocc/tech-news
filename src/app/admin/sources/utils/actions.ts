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

export async function consultSource(sourceId: number) {
  try {
    const data = await prisma.newsSource.findUnique({
      where: {
        id: sourceId,
      },
    });

    if (!data) {
      return {
        success: false,
        data: null,
        message: `No se encontró ningún source con el ID ${sourceId}`,
      };
    }

    return {
      success: true,
      data: {
        id: data.id,
        name: data.name,
        url: data.url,
        lastUpdateAt: data.lastUpdateAt,
        isActive: data.isActive,
      },
      message: "Source encontrado exitosamente",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: `Error al consultar el source con ID ${sourceId}: ${error}`,
    };
  }
}

export async function updateNewsSource(
  id: number,
  name: string,
  url: string,
  isActive: boolean,
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.newsSource.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        url: url,
        isActive: isActive,
      },
    });

    return {
      success: true,
      message: `Source con ID ${id} actualizado exitosamente.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar el Source con ID ${id}: ${error}`,
    };
  }
}
