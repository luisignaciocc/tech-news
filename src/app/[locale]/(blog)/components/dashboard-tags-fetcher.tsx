import { getMostUsedTags } from "@/lib/api";

import DashboardNavBar from "./dashboard-navbar";

export default async function DashboardTagsFetcher() {
  const tagsMostUsed = await getMostUsedTags(4);

  return <DashboardNavBar tags={tagsMostUsed} />;
}
