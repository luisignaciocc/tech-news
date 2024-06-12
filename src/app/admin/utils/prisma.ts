import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPostsGroupByDate() {
  try {
    const data = await prisma.post.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
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

export async function countLastDays(
  days: number,
): Promise<{ count: number; percentage: number }> {
  try {
    const [currentPeriod, previousPeriod] = await Promise.all([
      prisma.post.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.post.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - days * 2 * 24 * 60 * 60 * 1000),
            lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
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
