import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getToPublishData(page: number, perPage: number) {
  const totalCount = await prisma.news.count({
    where: {
      sentToApproval: true,
      filtered: false,
      deletedAt: null,
    },
  });

  const offset = (page - 1) * perPage;
  const data = await prisma.news.findMany({
    where: {
      sentToApproval: true,
      filtered: false,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
    },
    skip: offset,
    take: perPage,
  });

  const hasMorePages = totalCount > page * perPage;

  return {
    data,
    hasMorePages,
  };
}
