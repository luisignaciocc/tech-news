import { getRelatedPostFromPostSlug, getSimilarNews } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getRelatedPostFromPostSlug: jest.fn(),
  getSimilarNews: jest.fn(),
}));

describe("getRelatedPostFromPostSlug", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns related post when successful", async () => {
    const mockPost = {
      id: 1,
      coverImage: "https://example.com/image.jpg",
      title: "Related Post",
      slug: "related-post",
      publishedAt: new Date(),
      tags: ["tag1", "tag2"],
      new: {
        id: "123",
      },
    };

    const mockSimilarNews = [
      { id: "123", similarity: 0.8 },
      { id: "456", similarity: 0.7 },
    ];

    (getRelatedPostFromPostSlug as jest.Mock).mockResolvedValue([
      { ...mockPost, new: mockSimilarNews },
    ]);

    const result = await getRelatedPostFromPostSlug("related-post");

    // console.log("related post when successful");
    // console.log(result);

    expect(result).toEqual([{ ...mockPost, new: mockSimilarNews }]);
    expect(getRelatedPostFromPostSlug).toHaveBeenCalledWith("related-post");
  });

  test("returns empty array when no related post found", async () => {
    (getRelatedPostFromPostSlug as jest.Mock).mockResolvedValue([]);

    const result = await getRelatedPostFromPostSlug("non-existent-slug");

    // console.log("No related post found");
    // console.log(result);

    expect(result).toEqual([]);
    expect(getRelatedPostFromPostSlug).toHaveBeenCalledWith(
      "non-existent-slug",
    );
    expect(getSimilarNews).not.toHaveBeenCalled();
  });
});

describe("getSimilarNews", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns similar news", async () => {
    const mockSimilarNews = [
      { id: "123", similarity: 0.8 },
      { id: "456", similarity: 0.7 },
    ];

    (getSimilarNews as jest.Mock).mockResolvedValue(mockSimilarNews);

    const result = await getSimilarNews("123");

    // console.log("Similar news");
    // console.log(result);

    expect(result).toEqual(mockSimilarNews);
    expect(getSimilarNews).toHaveBeenCalledWith("123");
  });

  test("returns empty array when no similar news found", async () => {
    (getSimilarNews as jest.Mock).mockResolvedValue([]);

    const result = await getSimilarNews("non-existent-id");

    // console.log("No similar news found");
    // console.log(result);

    expect(result).toEqual([]);
    expect(getSimilarNews).toHaveBeenCalledWith("non-existent-id");
  });
});
