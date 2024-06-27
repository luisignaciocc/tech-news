import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPostsData(page: number, perPage: number) {
  const [totalCount, data] = await Promise.all([
    prisma.post.count(),

    prisma.post.findMany({
      select: {
        id: true,
        title: true,
        coverImage: true,
        newId: true,
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
