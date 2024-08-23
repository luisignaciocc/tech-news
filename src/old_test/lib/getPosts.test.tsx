import { getPosts } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getPosts: jest.fn(),
}));

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

const mockCount = 20;

describe("getPosts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the mocked getPosts function with the correct parameters", async () => {
    (getPosts as jest.Mock).mockResolvedValue({
      posts: mockPosts,
      count: mockCount,
    });

    const params = {
      page: 2,
      perPage: 10,
    };
    const { posts, count } = await getPosts(params);

    expect(getPosts).toHaveBeenCalledWith(params);
    expect(posts).toEqual(mockPosts);
    expect(count).toEqual(mockCount);
  });

  it("should call the mocked getPosts function with default values for page and perPage", async () => {
    (getPosts as jest.Mock).mockResolvedValue({
      posts: mockPosts,
      count: mockCount,
    });

    const result = await getPosts();

    // console.log(result);

    expect(getPosts).toHaveBeenCalledWith();
    expect(result.posts).toEqual(mockPosts);
    expect(result.count).toEqual(mockCount);
  });
});
