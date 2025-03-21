import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSourcesData() {
  const newsSources = await prisma.newsSource.findMany({
    select: {
      id: true,
      name: true,
      lastUpdateAt: true,
      isActive: true,
    },
    orderBy: {
      lastUpdateAt: "desc",
    },
  });

  const newsSourcesWithCount = await Promise.all(
    newsSources.map(async (newsSource) => {
      const news = await prisma.news.findMany({
        where: {
          sourceId: newsSource.id,
        },
        select: {
          id: true,
        },
      });

      const newsCount = await prisma.post.count({
        where: {
          newId: {
            in: news.map((n) => n.id),
          },
        },
      });

      return {
        id: newsSource.id,
        newsCount,
      };
    }),
  );

  return {
    newsSources,
    newsSourcesWithCount,
  };
}
