import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDeletedData(page: number, perPage: number) {
  const [totalCount, data] = await Promise.all([
    prisma.news.count({
      where: {
        deletedAt: {
          not: null,
        },
      },
    }),

    prisma.news.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
      select: {
        id: true,
        title: true,
        deletionReason: true,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ]);

  const hasMorePages = totalCount > page * perPage;

  return {
    data,
    hasMorePages,
  };
}
