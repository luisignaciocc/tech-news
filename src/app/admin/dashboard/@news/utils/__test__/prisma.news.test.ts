import { prismaMock } from "../../../../../../../singleton";
import {
  getCollectedNews,
  getLastDayNewsStats,
  getValidatedNews,
} from "../prisma";

describe("Testing getCollectedNews function in app/admin/dashboard/@news/utils/prisma.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an empty array if an error occurs", async () => {
    (prismaMock.news.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const news = await getCollectedNews();

    expect(news).toEqual([]);
  });
});

describe("Testing getValidatedNews function in app/admin/dashboard/@news/utils/prisma.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an empty array if an error occurs", async () => {
    (prismaMock.news.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const news = await getValidatedNews();

    expect(news).toEqual([]);
  });
});

// Testing getCollectedNewsGroupByDate function in app/admin/dashboard/@news/utils/prisma.ts

// Testing getValidatedNewsGroupByDate function in app/admin/dashboard/@news/utils/prisma.ts

describe("Testing getLastDayNewsStats function in app/admin/dashboard/@news/utils/prisma.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return zero count and percentage on error", async () => {
    (prismaMock.news.count as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const result = await getLastDayNewsStats();

    expect(result).toEqual({ count: 0, percentage: 0 });
  });
});
