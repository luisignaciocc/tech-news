import { prismaMock } from "../../../singleton";
import { getPostBySlug, getPostPages, getPostSlugs, getTags } from "../api";

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

describe("Testing /api/getPostBySlug function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a post by slug", async () => {
    const mockPost = {
      id: 1,
      slug: "my-post",
      title: "My Post",
      content: "This is the content of my post.",
      author: {
        id: 1,
        name: "John Doe",
      },
      tags: [
        {
          id: 1,
          name: "tag1",
        },
        {
          id: 2,
          name: "tag2",
        },
      ],
    };

    (prismaMock.post.findUnique as jest.Mock).mockResolvedValue(mockPost);

    const post = await getPostBySlug("my-post");

    expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
      where: {
        slug: "my-post",
      },
      include: {
        author: true,
        tags: true,
      },
    });
    expect(post).toEqual(mockPost);
  });

  test("should return null when post does not exist", async () => {
    (prismaMock.post.findUnique as jest.Mock).mockResolvedValue(null);

    const post = await getPostBySlug("non-existent-slug");

    expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
      where: {
        slug: "non-existent-slug",
      },
      include: {
        author: true,
        tags: true,
      },
    });
    expect(post).toBeNull();
  });
});

describe("Testing /api/getTags function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a list of tags", async () => {
    const mockTags = [
      {
        id: 1,
        name: "tag1",
      },
      {
        id: 2,
        name: "tag2",
      },
      {
        id: 3,
        name: "tag3",
      },
    ];

    (prismaMock.tag.findMany as jest.Mock).mockResolvedValue(mockTags);

    const tags = await getTags();

    expect(prismaMock.tag.findMany).toHaveBeenCalledWith();
    expect(tags).toEqual(mockTags);
  });
});
