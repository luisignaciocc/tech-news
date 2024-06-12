"use client";
import { useSearchParams } from "next/navigation";

import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";

import DashboardTabList from "./components/dashboard-tab-list";

type TabContent = {
  [key: string]: React.ReactNode;
};

export default function GroupedLayout({
  posts,
  news,
}: Readonly<{
  posts: React.ReactNode;
  news: React.ReactNode;
}>) {
  const tabContent: TabContent = {
    posts,
    news,
  };

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "posts";

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue={tab} className="space-y-4">
        <DashboardTabList />
        <TabsContent value={tab} className="space-y-4">
          {tabContent[tab]}
        </TabsContent>
      </Tabs>
    </div>
  );
}
