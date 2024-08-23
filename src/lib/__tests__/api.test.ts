import { getPostPages } from "../api";
import { prismaMock } from "../../../singleton";

describe("Testing /api functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an array of page objects", async () => {
    (prismaMock.post.count as jest.Mock).mockResolvedValue(100);

    const pages = await getPostPages();

    expect(pages).toHaveLength(3);
    expect(pages).toEqual([
      { params: { page: "2" } },
      { params: { page: "3" } },
      { params: { page: "4" } },
    ]);
  });
});
