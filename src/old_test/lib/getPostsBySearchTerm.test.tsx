import { getPostsBySearchTerm } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getPostsBySearchTerm: jest.fn(),
}));

describe("getPostsBySearchTerm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object with posts and count", async () => {
    const mockPosts = [
      {
        id: 1,
        slug: "post-1",
        title: "Post 1",
        coverImage: "post1-cover.jpg",
        createdAt: new Date("2023-01-01"),
        excerpt: "Excerpt for Post 1",
        author: {
          name: "Author 1",
        },
        tags: [{ name: "Tag 1" }, { name: "Tag 2" }],
      },
      {
        id: 2,
        slug: "post-2",
        title: "Post 2",
        coverImage: "post2-cover.jpg",
        createdAt: new Date("2023-02-01"),
        excerpt: "Excerpt for Post 2",
        author: {
          name: "Author 2",
        },
        tags: [{ name: "Tag 2" }, { name: "Tag 3" }],
      },
    ];

    const mockCount = 10;

    (getPostsBySearchTerm as jest.Mock).mockResolvedValue({
      posts: mockPosts,
      count: mockCount,
    });

    const searchTerm = "search term";
    const numberPosts = 10;
    const { posts, count } = await getPostsBySearchTerm(
      searchTerm,
      numberPosts,
    );

    // console.log(posts);
    // console.log(count);

    expect(getPostsBySearchTerm).toHaveBeenCalledWith(searchTerm, numberPosts);
    expect(posts).toEqual(mockPosts);
    expect(count).toEqual(mockCount);
  });
});
