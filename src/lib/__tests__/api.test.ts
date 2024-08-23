import {
  getPostPages,
  getPostSlugs,
  getPostBySlug,
  getTags,
  getPostsCards,
  getRandomPostsFromTwoWeeksAgo,
  getRelatedPostFromPostSlug,
  getSimilarNews,
  getMostUsedTags,
  getPostsByTags,
  getPostsBySearchTerm,
  getPosts,
} from "../api";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
jest.mock("@prisma/client");

const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>;

describe("Testing module functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getPostPages should calculate number of pages correctly", async () => {
    (prismaMock.post.count as jest.Mock).mockResolvedValue(20);
    const pages = await getPostPages();
    expect(pages).toHaveLength(1);
  });

  test("getPostSlugs should return a list of slugs", async () => {
    const mockSlugs = [{ slug: "first-post" }, { slug: "second-post" }];
    (prismaMock.post.findMany as jest.Mock).mockResolvedValue(mockSlugs);

    const slugs = await getPostSlugs();
    expect(slugs).toEqual(mockSlugs);
  });

  test("getPostBySlug should return a post with the given slug", async () => {
    const mockPost = {
      slug: "test-slug",
      author: { name: "Author Name" },
      tags: [{ name: "Tag1" }],
    };
    (prismaMock.post.findUnique as jest.Mock).mockResolvedValue(mockPost);

    const post = await getPostBySlug("test-slug");
    expect(post).toEqual(mockPost);
  });

  test("getTags should return a list of tags", async () => {
    const mockTags = [{ name: "Tag1" }, { name: "Tag2" }];
    (prismaMock.tag.findMany as jest.Mock).mockResolvedValue(mockTags);

    const tags = await getTags();
    expect(tags).toEqual(mockTags);
  });
});
