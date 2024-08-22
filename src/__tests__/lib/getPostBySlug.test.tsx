import { getPostBySlug } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getPostBySlug: jest.fn(),
}));

describe("getPostBySlug", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a post by slug", async () => {
    const slug = "my-post-slug";
    const mockPost = {
      id: 1,
      title: "My Post",
      slug: "my-post-slug",
      author: {
        id: 1,
        name: "John Doe",
      },
      tags: [
        { id: 1, name: "tag1" },
        { id: 2, name: "tag2" },
      ],
    };

    (getPostBySlug as jest.Mock).mockResolvedValue(mockPost);

    const post = await getPostBySlug(slug);

    // console.log(post);

    expect(getPostBySlug).toHaveBeenCalledWith(slug);
    expect(post).toEqual(mockPost);
  });
});
