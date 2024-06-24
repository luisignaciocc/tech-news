import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getNotAprovedData(page: number, perPage: number) {
  const [totalCount, data] = await Promise.all([
    prisma.news.count({
      where: {
        sentToApproval: true,
        filtered: false,
        deletedAt: {
          not: null,
        },
      },
    }),
    prisma.news.findMany({
      where: {
        sentToApproval: true,
        filtered: false,
        deletedAt: {
          not: null,
        },
      },
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        createdAt: "desc",
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
