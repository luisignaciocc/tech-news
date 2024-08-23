import { getPostsByTags } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getPostsByTags: jest.fn(),
}));

describe("getPostsByTags", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of posts with the specified tags", async () => {
    const mockPosts = [
      {
        id: 1,
        coverImage: "post1-cover.jpg",
        title: "Post 1",
        slug: "post-1",
        createdAt: new Date("2023-01-01"),
        excerpt: "Excerpt for Post 1",
        tags: [{ name: "Tag 1" }, { name: "Tag 2" }],
        author: {
          name: "Author 1",
        },
      },
      {
        id: 2,
        coverImage: "post2-cover.jpg",
        title: "Post 2",
        slug: "post-2",
        createdAt: new Date("2023-02-01"),
        excerpt: "Excerpt for Post 2",
        tags: [{ name: "Tag 2" }, { name: "Tag 3" }],
        author: {
          name: "Author 2",
        },
      },
    ];

    (getPostsByTags as jest.Mock).mockResolvedValue(mockPosts);

    const tags = ["Tag 1", "Tag 2"];
    const limit = 10;
    const posts = await getPostsByTags(tags, limit);

    // console.log(posts);

    expect(getPostsByTags).toHaveBeenCalledWith(tags, limit);
    expect(posts).toEqual(mockPosts);
  });
});
