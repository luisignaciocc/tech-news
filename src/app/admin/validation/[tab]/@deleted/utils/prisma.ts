import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDeletedData() {
  const data = await prisma.news.findMany({
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
  });

  return data;
}
