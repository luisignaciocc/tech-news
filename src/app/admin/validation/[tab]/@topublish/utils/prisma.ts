import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getToPublishData() {
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
  });

  return data;
}
