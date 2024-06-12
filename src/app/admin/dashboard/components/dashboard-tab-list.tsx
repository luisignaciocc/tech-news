"use client";
import { useRouter } from "next/navigation";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

function DashboardTabList() {
  const router = useRouter();

  const handleTabClick = (tab: string) => {
    router.push(`/admin/dashboard?tab=${tab}`);
  };

  return (
    <TabsList>
      <TabsTrigger value="posts" onClick={() => handleTabClick("posts")}>
        Posts
      </TabsTrigger>
      <TabsTrigger value="news" onClick={() => handleTabClick("news")}>
        News
      </TabsTrigger>
      <TabsTrigger value="reports" onClick={() => handleTabClick("reports")}>
        Reports
      </TabsTrigger>
      <TabsTrigger
        value="notifications"
        onClick={() => handleTabClick("notifications")}
      >
        Notifications
      </TabsTrigger>
    </TabsList>
  );
}

export default DashboardTabList;
