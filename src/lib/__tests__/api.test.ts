import { prismaMock } from "../../../singleton";
import { getPostPages, getPostSlugs } from "../api";

describe("Testing /api/getPostPages function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an array of page objects", async () => {
    (prismaMock.post.count as jest.Mock).mockResolvedValue(100);

    const pages = await getPostPages();

    expect(pages).toHaveLength(3);
    expect(pages).toEqual([
      { params: { page: "2" } },
      { params: { page: "3" } },
      { params: { page: "4" } },
    ]);
  });
});

describe("Testing /api/getPostSlugs function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return all post slugs", async () => {
    const mockSlugs = [
      { slug: "post-1" },
      { slug: "post-2" },
      { slug: "post-3" },
    ];
    (prismaMock.post.findMany as jest.Mock).mockResolvedValue(mockSlugs);

    const slugs = await getPostSlugs();

    expect(prismaMock.post.findMany).toHaveBeenCalledWith({
      select: {
        slug: true,
      },
      take: undefined,
    });
    expect(slugs).toEqual(mockSlugs);
  });

  test("should return limited post slugs", async () => {
    const mockSlugs = [{ slug: "post-1" }, { slug: "post-2" }];
    (prismaMock.post.findMany as jest.Mock).mockResolvedValue(mockSlugs);

    const slugs = await getPostSlugs({ limit: 2 });

    expect(prismaMock.post.findMany).toHaveBeenCalledWith({
      select: {
        slug: true,
      },
      take: 2,
    });
    expect(slugs).toEqual(mockSlugs);
  });

  test("should return empty array when there are no posts", async () => {
    (prismaMock.post.findMany as jest.Mock).mockResolvedValue([]);

    const slugs = await getPostSlugs();

    expect(prismaMock.post.findMany).toHaveBeenCalledWith({
      select: {
        slug: true,
      },
      take: undefined,
    });
    expect(slugs).toEqual([]);
  });
});
