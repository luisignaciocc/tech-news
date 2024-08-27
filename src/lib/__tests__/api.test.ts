import { prismaMock } from "../../../singleton";
import {
  getMostUsedTags,
  getPostBySlug,
  getPostPages,
  getPostsBySearchTerm,
  getPostsByTags,
  getPostsCards,
  getPostSlugs,
  getTags,
} from "../api";

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

describe("Testing /api/getPostsCards function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a list of post cards excluding the current post", async () => {
    const mockPosts = [
      {
        id: 1,
        coverImage: "image1.jpg",
        title: "Post 1",
        slug: "post-1",
        publishedAt: new Date("2023-01-01"),
        tags: [
          {
            id: 1,
            name: "tag1",
          },
        ],
      },
      {
        id: 2,
        coverImage: "image2.jpg",
        title: "Post 2",
        slug: "post-2",
        publishedAt: new Date("2023-02-01"),
        tags: [
          {
            id: 2,
            name: "tag2",
          },
        ],
      },
      {
        id: 3,
        coverImage: "image3.jpg",
        title: "Post 3",
        slug: "post-3",
        publishedAt: new Date("2023-03-01"),
        tags: [
          {
            id: 3,
            name: "tag3",
          },
        ],
      },
    ];

    (prismaMock.post.findMany as jest.Mock).mockResolvedValue(
      mockPosts.filter((post) => post.slug !== "post-2"),
    );

    const posts = await getPostsCards("post-2", 2);

    expect(prismaMock.post.findMany).toHaveBeenCalledWith({
      where: {
        slug: {
          not: "post-2",
        },
      },
      select: {
        id: true,
        coverImage: true,
        title: true,
        slug: true,
        publishedAt: true,
        tags: true,
      },
      take: 2,
      orderBy: {
        createdAt: "desc",
      },
    });
    expect(posts).toEqual([
      {
        id: 1,
        coverImage: "image1.jpg",
        title: "Post 1",
        slug: "post-1",
        publishedAt: new Date("2023-01-01"),
        tags: [
          {
            id: 1,
            name: "tag1",
          },
        ],
      },
      {
        id: 3,
        coverImage: "image3.jpg",
        title: "Post 3",
        slug: "post-3",
        publishedAt: new Date("2023-03-01"),
        tags: [
          {
            id: 3,
            name: "tag3",
          },
        ],
      },
    ]);
  });
});

// Testing /api/getRandomPostsFromTwoWeeksAgo function

// Testing /api/getRelatedPostFromPostSlug and  /api/getSimilarNews functions

describe("Testing /api/getMostUsedTags function", () => {
  test("should return the most used tags", async () => {
    const mockTags = [
      { id: 1, name: "tag1", posts: { _count: 10 } },
      { id: 2, name: "tag2", posts: { _count: 8 } },
      { id: 3, name: "tag3", posts: { _count: 5 } },
    ];
    prismaMock.tag.findMany.mockResolvedValue(mockTags);

    const result = await getMostUsedTags(3);

    expect(prismaMock.tag.findMany).toHaveBeenCalledWith({
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      select: {
        name: true,
      },
      take: 3,
    });
    expect(result).toEqual(["tag1", "tag2", "tag3"]);
  });
});

describe("Testing /api/getPostsByTags function", () => {
  test("should return posts by tags", async () => {
    const mockPosts: {
      id: string;
      slug: string;
      title: string;
      content: string;
      createdAt: Date;
      coverImage: string | null;
      authorId: string;
      excerpt: string | null;
      publishedAt: Date | null;
      newId: string | null;
      postedToTwitter: boolean;
      tweetId: string | null;
      postedToLinkedin: boolean;
      linkedinPostId: string | null;
      facebookPostId: string | null;
      postedToInstagram: boolean;
      instagramMediaId: string | null;
      postedToFacebook: boolean;
      tags: { name: string }[];
      author: { name: string };
    }[] = [
      {
        id: "1",
        slug: "post-1",
        title: "Post 1",
        content: "Content 1",
        createdAt: new Date("2023-01-01"),
        coverImage: "https://example.com/image1.jpg",
        authorId: "author1",
        excerpt: "Excerpt 1",
        publishedAt: new Date("2023-01-01"),
        newId: null,
        postedToTwitter: true,
        tweetId: "tweet1",
        postedToLinkedin: false,
        linkedinPostId: null,
        facebookPostId: null,
        postedToInstagram: false,
        instagramMediaId: null,
        postedToFacebook: false,
        tags: [{ name: "tag1" }, { name: "tag2" }],
        author: { name: "Author 1" },
      },
      {
        id: "2",
        slug: "post-2",
        title: "Post 2",
        content: "Content 2",
        createdAt: new Date("2023-02-01"),
        coverImage: "https://example.com/image2.jpg",
        authorId: "author2",
        excerpt: "Excerpt 2",
        publishedAt: new Date("2023-02-01"),
        newId: null,
        postedToTwitter: false,
        tweetId: null,
        postedToLinkedin: true,
        linkedinPostId: "linkedin1",
        facebookPostId: null,
        postedToInstagram: false,
        instagramMediaId: null,
        postedToFacebook: false,
        tags: [{ name: "tag2" }, { name: "tag3" }],
        author: { name: "Author 2" },
      },
      {
        id: "3",
        slug: "post-3",
        title: "Post 3",
        content: "Content 3",
        createdAt: new Date("2023-03-01"),
        coverImage: "https://example.com/image3.jpg",
        authorId: "author3",
        excerpt: "Excerpt 3",
        publishedAt: new Date("2023-03-01"),
        newId: null,
        postedToTwitter: true,
        tweetId: "tweet2",
        postedToLinkedin: false,
        linkedinPostId: null,
        facebookPostId: "facebook1",
        postedToInstagram: false,
        instagramMediaId: null,
        postedToFacebook: false,
        tags: [{ name: "tag3" }, { name: "tag4" }],
        author: { name: "Author 3" },
      },
    ];
    prismaMock.post.findMany.mockResolvedValue(mockPosts);

    const result = await getPostsByTags(["tag2", "tag3"], 2);

    expect(prismaMock.post.findMany).toHaveBeenCalledWith({
      where: {
        tags: {
          some: {
            name: {
              in: ["tag2", "tag3"],
            },
          },
        },
      },
      select: {
        id: true,
        coverImage: true,
        title: true,
        slug: true,
        createdAt: true,
        excerpt: true,
        tags: {
          select: {
            name: true,
          },
        },
        author: true,
      },
      take: 2,
      orderBy: {
        createdAt: "desc",
      },
    });
    expect(result).toEqual([
      {
        author: {
          name: "Author 1",
        },
        authorId: "author1",
        content: "Content 1",
        coverImage: "https://example.com/image1.jpg",
        createdAt: new Date("2023-01-01T00:00:00.000Z"),
        excerpt: "Excerpt 1",
        facebookPostId: null,
        id: "1",
        instagramMediaId: null,
        linkedinPostId: null,
        newId: null,
        postedToFacebook: false,
        postedToInstagram: false,
        postedToLinkedin: false,
        postedToTwitter: true,
        publishedAt: new Date("2023-01-01T00:00:00.000Z"),
        slug: "post-1",
        tags: [
          {
            name: "tag1",
          },
          {
            name: "tag2",
          },
        ],
        title: "Post 1",
        tweetId: "tweet1",
      },
      {
        author: {
          name: "Author 2",
        },
        authorId: "author2",
        content: "Content 2",
        coverImage: "https://example.com/image2.jpg",
        createdAt: new Date("2023-02-01T00:00:00.000Z"),
        excerpt: "Excerpt 2",
        facebookPostId: null,
        id: "2",
        instagramMediaId: null,
        linkedinPostId: "linkedin1",
        newId: null,
        postedToFacebook: false,
        postedToInstagram: false,
        postedToLinkedin: true,
        postedToTwitter: false,
        publishedAt: new Date("2023-02-01T00:00:00.000Z"),
        slug: "post-2",
        tags: [
          {
            name: "tag2",
          },
          {
            name: "tag3",
          },
        ],
        title: "Post 2",
        tweetId: null,
      },
      {
        author: {
          name: "Author 3",
        },
        authorId: "author3",
        content: "Content 3",
        coverImage: "https://example.com/image3.jpg",
        createdAt: new Date("2023-03-01T00:00:00.000Z"),
        excerpt: "Excerpt 3",
        facebookPostId: "facebook1",
        id: "3",
        instagramMediaId: null,
        linkedinPostId: null,
        newId: null,
        postedToFacebook: false,
        postedToInstagram: false,
        postedToLinkedin: false,
        postedToTwitter: true,
        publishedAt: new Date("2023-03-01T00:00:00.000Z"),
        slug: "post-3",
        tags: [
          {
            name: "tag3",
          },
          {
            name: "tag4",
          },
        ],
        title: "Post 3",
        tweetId: "tweet2",
      },
    ]);
  });
});

describe("Testing /api/getPostsBySearchTerm function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return posts with the given search term in the title", async () => {
    const searchTerm = "javascript";
    const numberPosts = 10;
    const mockPosts: {
      id: string;
      slug: string;
      title: string;
      content: string;
      createdAt: Date;
      coverImage: string | null;
      authorId: string;
      excerpt: string | null;
      publishedAt: Date | null;
      newId: string | null;
      postedToTwitter: boolean;
      tweetId: string | null;
      postedToLinkedin: boolean;
      linkedinPostId: string | null;
      postedToInstagram: boolean;
      instagramMediaId: string | null;
      postedToFacebook: boolean;
      facebookPostId: string | null;
      author: {
        name: string;
      };
      tags: {
        name: string;
      }[];
    }[] = [
      {
        id: "1",
        slug: "post-1",
        title: "JavaScript for beginners",
        content: "Content for post 1",
        createdAt: new Date(),
        coverImage: "post-1.jpg",
        authorId: "author1",
        excerpt: "This is an excerpt",
        publishedAt: new Date(),
        newId: null,
        postedToTwitter: false,
        tweetId: null,
        postedToLinkedin: false,
        linkedinPostId: null,
        postedToInstagram: false,
        instagramMediaId: null,
        postedToFacebook: false,
        facebookPostId: null,
        author: { name: "John Doe" },
        tags: [{ name: "javascript" }],
      },
      {
        id: "2",
        slug: "post-2",
        title: "React for beginners",
        content: "Content for post 2",
        createdAt: new Date(),
        coverImage: "post-2.jpg",
        authorId: "author2",
        excerpt: "This is another excerpt",
        publishedAt: new Date(),
        newId: null,
        postedToTwitter: false,
        tweetId: null,
        postedToLinkedin: false,
        linkedinPostId: null,
        postedToInstagram: false,
        instagramMediaId: null,
        postedToFacebook: false,
        facebookPostId: null,
        author: { name: "Jane Doe" },
        tags: [{ name: "react" }],
      },
    ];
    const mockCount = 20;

    prismaMock.post.findMany.mockResolvedValue(mockPosts);
    prismaMock.post.count.mockResolvedValue(mockCount);

    const { posts, count } = await getPostsBySearchTerm(
      searchTerm,
      numberPosts,
    );

    expect(posts).toEqual(mockPosts);
    expect(count).toBe(mockCount);
    expect(prismaMock.post.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            content: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        coverImage: true,
        createdAt: true,
        excerpt: true,
        author: true,
        tags: true,
      },
      take: numberPosts,
    });
    expect(prismaMock.post.count).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            content: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  });
});
