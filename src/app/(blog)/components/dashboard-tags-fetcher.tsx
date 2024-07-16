import { getMostUsedTags } from "@/lib/api";

import DashboardNavBar from "./dashboard-navbar";

export default async function DashboardTagsFetcher() {
  const tagsMostUsed = await getMostUsedTags(6);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <DashboardNavBar tags={tagsMostUsed} />;
}
