import { getPostsCards } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getPostsCards: jest.fn(),
}));

describe("getPostsCards", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of post cards", async () => {
    const mockPosts = [
      {
        id: 1,
        coverImage: "https://example.com/image1.jpg",
        title: "Post 1",
        slug: "post-1",
        publishedAt: new Date("2023-01-01"),
        tags: [
          { id: 1, name: "Tag 1" },
          { id: 2, name: "Tag 2" },
        ],
      },
      {
        id: 2,
        coverImage: "https://example.com/image2.jpg",
        title: "Post 2",
        slug: "post-2",
        publishedAt: new Date("2023-02-01"),
        tags: [{ id: 3, name: "Tag 3" }],
      },
      {
        id: 3,
        coverImage: "https://example.com/image3.jpg",
        title: "Post 3",
        slug: "post-3",
        publishedAt: new Date("2023-03-01"),
        tags: [],
      },
    ];

    (getPostsCards as jest.Mock).mockResolvedValue(mockPosts);

    const posts = await getPostsCards("post-1", 2);

    // console.log(posts);

    expect(getPostsCards).toHaveBeenCalledWith("post-1", 2);
    expect(posts).toEqual([
      {
        id: 1,
        coverImage: "https://example.com/image1.jpg",
        title: "Post 1",
        slug: "post-1",
        publishedAt: new Date("2023-01-01"),
        tags: [
          { id: 1, name: "Tag 1" },
          { id: 2, name: "Tag 2" },
        ],
      },
      {
        id: 2,
        coverImage: "https://example.com/image2.jpg",
        title: "Post 2",
        slug: "post-2",
        publishedAt: new Date("2023-02-01"),
        tags: [{ id: 3, name: "Tag 3" }],
      },
      {
        id: 3,
        coverImage: "https://example.com/image3.jpg",
        title: "Post 3",
        slug: "post-3",
        publishedAt: new Date("2023-03-01"),
        tags: [],
      },
    ]);
  });
});
