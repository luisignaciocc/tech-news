import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCollectedNews = async () => {
  try {
    const posts = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        createdAt: true,
        title: true,
        coverImage: true,
        url: true,
        source: {
          select: {
            id: true,
            url: true,
            name: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    return [];
  }
};

export const getValidatedNews = async () => {
  try {
    const posts = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        createdAt: true,
        title: true,
        coverImage: true,
        url: true,
        source: {
          select: {
            id: true,
            url: true,
            name: true,
          },
        },
      },
      where: {
        deletedAt: null,
        filtered: true,
        posts: {
          none: {},
        },
      },
    });

    return posts;
  } catch (error) {
    return [];
  }
};

export async function getCollectedNewsGroupByDate() {
  try {
    const data = await prisma.news.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const processedData = data.reduce(
      (acc, item) => {
        const date = new Date(item.createdAt).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });
        const existingItem = acc.find((i) => i.name === date);

        if (existingItem) {
          existingItem.total += item._count._all;
        } else {
          acc.push({ name: date, total: item._count._all });
        }

        return acc;
      },
      [] as { name: string; total: number }[],
    );

    return processedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getValidatedNewsGroupByDate() {
  try {
    const data = await prisma.news.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        filtered: true,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const processedData = data.reduce(
      (acc, item) => {
        const date = new Date(item.createdAt).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });
        const existingItem = acc.find((i) => i.name === date);

        if (existingItem) {
          existingItem.total += item._count._all;
        } else {
          acc.push({ name: date, total: item._count._all });
        }

        return acc;
      },
      [] as { name: string; total: number }[],
    );

    return processedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLastDayNewsStats(
  where?: Prisma.NewsWhereInput,
): Promise<{
  count: number;
  percentage: number;
}> {
  try {
    const [currentPeriod, previousPeriod] = await Promise.all([
      prisma.news.count({
        where: {
          ...where,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.news.count({
        where: {
          ...where,
          createdAt: {
            gte: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    let percentage = 0;
    if (previousPeriod > 0) {
      percentage = ((currentPeriod - previousPeriod) / previousPeriod) * 100;
    }

    return {
      count: currentPeriod,
      percentage: parseFloat(percentage.toFixed(2)),
    };
  } catch (error) {
    return { count: 0, percentage: 0 };
  }
}
