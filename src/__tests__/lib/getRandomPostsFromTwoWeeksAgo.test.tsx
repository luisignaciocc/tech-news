import { getRandomPostsFromTwoWeeksAgo } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getRandomPostsFromTwoWeeksAgo: jest.fn(),
}));

describe("getRandomPostsFromTwoWeeksAgo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of random posts from the last two weeks", async () => {
    const limit = 3;
    const mockPosts = [
      {
        id: "post1",
        slug: "post1-slug",
        title: "Post 1",
        content: "Content 1",
        createdAt: new Date(),
        coverImage: "post1-cover.jpg",
        authorId: "author1",
        excerpt: "Excerpt 1",
        publishedAt: new Date(),
        newId: "new1",
        facebookPostIdNew: "fb1",
        postedToInstagram: true,
        instagramMediaIdts: "insta1",
      },
      {
        id: "post2",
        slug: "post2-slug",
        title: "Post 2",
        content: "Content 2",
        createdAt: new Date(),
        coverImage: "post2-cover.jpg",
        authorId: "author2",
        excerpt: "Excerpt 2",
        publishedAt: new Date(),
        newId: "new2",
        facebookPostIdNew: "fb2",
        postedToInstagram: true,
        instagramMediaIdts: "insta2",
      },
      {
        id: "post3",
        slug: "post3-slug",
        title: "Post 3",
        content: "Content 3",
        createdAt: new Date(),
        coverImage: "post3-cover.jpg",
        authorId: "author3",
        excerpt: "Excerpt 3",
        publishedAt: new Date(),
        newId: "new3",
        facebookPostIdNew: "fb3",
        postedToInstagram: true,
        instagramMediaIdts: "insta3",
      },
    ];

    (getRandomPostsFromTwoWeeksAgo as jest.Mock).mockResolvedValue(mockPosts);

    const randomPosts = await getRandomPostsFromTwoWeeksAgo(limit);

    // console.log(randomPosts);

    expect(getRandomPostsFromTwoWeeksAgo).toHaveBeenCalledWith(limit);
    expect(randomPosts).toEqual(mockPosts);
  });
});
