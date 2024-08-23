import { getPostPages } from "../../lib/api";

jest.mock("../../lib/api.ts", () => ({
  getPostPages: jest
    .fn()
    .mockResolvedValue([
      { params: { page: "2" } },
      { params: { page: "3" } },
      { params: { page: "4" } },
      { params: { page: "5" } },
    ]),
}));

describe("getPostPages", () => {
  it("should return an array of page objects", async () => {
    const pages = await getPostPages();

    // console.log("Pages:");
    // pages.forEach((page) => {
    //   console.log(JSON.stringify(page, null, 2));
    // });

    expect(pages).toHaveLength(4);
    expect(pages).toEqual([
      { params: { page: "2" } },
      { params: { page: "3" } },
      { params: { page: "4" } },
      { params: { page: "5" } },
    ]);
  });
});
