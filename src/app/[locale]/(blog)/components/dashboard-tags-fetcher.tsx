import { getMostUsedTags } from "@/lib/api";

import DashboardNavBar from "./dashboard-navbar";

interface DashboardTagsFetcherProps {
  locale: string;
}

export default async function DashboardTagsFetcher({
  locale,
}: DashboardTagsFetcherProps) {
  const tagsMostUsed = await getMostUsedTags(4);

  return <DashboardNavBar tags={tagsMostUsed} locale={locale} />;
}
