import { getMostUsedTags } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getMostUsedTags: jest.fn(),
}));

describe("getMostUsedTags", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of most used tag names", async () => {
    const mockTags = [{ name: "Tag 1" }, { name: "Tag 2" }, { name: "Tag 3" }];

    (getMostUsedTags as jest.Mock).mockResolvedValue(
      mockTags.map((tag) => tag.name),
    );

    const limit = 3;
    const mostUsedTags = await getMostUsedTags(limit);

    // console.log(mostUsedTags);

    expect(getMostUsedTags).toHaveBeenCalledWith(limit);
    expect(mostUsedTags).toEqual(mockTags.map((tag) => tag.name));
  });
});
