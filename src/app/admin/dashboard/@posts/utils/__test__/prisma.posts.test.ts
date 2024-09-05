import { prismaMock } from "../../../../../../../singleton";
import {
  countPostsLastDays,
  countPostsToPublish,
  getRecentsPosts,
} from "../prisma";

describe("Testing getRecentsPosts function in /app/admin/dashboard/@posts/utils/prisma.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an empty array when an error occurs", async () => {
    (prismaMock.post.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const posts = await getRecentsPosts();

    expect(posts).toEqual([]);
  });
});

describe("Testing countPostsToPublish function in /app/admin/dashboard/@posts/utils/prisma.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return count as 0 and percentage as 0 if there is an error", async () => {
    (prismaMock.news.count as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const result = await countPostsToPublish();

    expect(result).toEqual({
      count: 0,
      percentage: 0,
    });
  });
});

describe("Testing countPostsLastDays function in /app/admin/dashboard/@posts/utils/prisma.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return count as 0 and percentage as 0 if there is an error", async () => {
    (prismaMock.post.count as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const result = await countPostsLastDays(7);

    expect(result).toEqual({
      count: 0,
      percentage: 0,
    });
  });
});
