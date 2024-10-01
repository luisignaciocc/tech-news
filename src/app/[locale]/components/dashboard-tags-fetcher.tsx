import { getMostUsedTags } from "@/lib/api";

import DashboardNavBar from "./dashboard-navbar";

export default async function DashboardTagsFetcher({
  locale,
}: {
  locale: string;
}) {
  const tagsMostUsed = await getMostUsedTags(4, locale);

  const tagNames = tagsMostUsed.map((tag) => tag.name);

  return <DashboardNavBar tags={tagNames} />;
}
