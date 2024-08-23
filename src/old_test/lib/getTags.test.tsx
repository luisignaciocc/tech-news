import { getTags } from "../../lib/api";

jest.mock("../../lib/api", () => ({
  getTags: jest.fn(),
}));

describe("getTags", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of tags", async () => {
    const mockTags = [
      { id: 1, name: "Tag 1" },
      { id: 2, name: "Tag 2" },
      { id: 3, name: "Tag 3" },
    ];

    (getTags as jest.Mock).mockResolvedValue(mockTags);

    const tags = await getTags();

    // console.log(tags);

    expect(getTags).toHaveBeenCalledWith();
    expect(tags).toEqual(mockTags);
  });
});
