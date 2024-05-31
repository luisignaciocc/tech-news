import { MetadataRoute } from "next";

import { getPostSlugs } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { PER_PAGE } from "@/lib/utils";
// Google's limit is 50,000 URLs per sitemap

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPostSlugs();

  const pages = Math.ceil(slugs.length / PER_PAGE) - 1; // -1 because the first page is handled by the index page

  const postUrls: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${SITE_URL}/posts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "never",
    priority: 0.8,
  }));

  const pagesUrls: MetadataRoute.Sitemap = Array.from({ length: pages }).map(
    (_, index) => ({
      url: `${SITE_URL}/page/${index + 2}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.5,
    }),
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...postUrls,
    ...pagesUrls,
  ];
}
