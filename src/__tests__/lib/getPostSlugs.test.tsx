import { getPostSlugs } from "../../lib/api";

jest.mock("../../lib/api.ts", () => ({
  getPostSlugs: jest
    .fn()
    .mockResolvedValue([
      { slug: "post-1" },
      { slug: "post-2" },
      { slug: "post-3" },
    ]),
}));

describe("getPostSlugs", () => {
  it("should return an array of post slugs", async () => {
    const slugs = await getPostSlugs();

    // console.log("Slugs:");
    // slugs.forEach((slug) => {
    //   console.log(JSON.stringify(slug, null, 2));
    // });

    expect(slugs).toHaveLength(3);
    expect(slugs).toEqual([
      { slug: "post-1" },
      { slug: "post-2" },
      { slug: "post-3" },
    ]);
  });

  it("should return a limited number of post slugs", async () => {
    const slugs = await getPostSlugs({ limit: 3 });

    expect(slugs).toHaveLength(3);
    expect(slugs).toEqual([
      { slug: "post-1" },
      { slug: "post-2" },
      { slug: "post-3" },
    ]);
  });
});
