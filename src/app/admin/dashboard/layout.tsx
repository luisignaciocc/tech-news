import { Metadata } from "next";

import TabsButtons from "@/components/tabs-buttons";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Administrativo.",
};

export default function Layout({
  posts,
  news,
}: Readonly<{
  posts: React.ReactNode;
  news: React.ReactNode;
}>) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsButtons
          tabs={[
            { value: "posts", label: "Posts" },
            { value: "news", label: "News" },
          ]}
        />
        <TabsContent value="posts" className="space-y-4">
          {posts}
        </TabsContent>
        <TabsContent value="news" className="space-y-4">
          {news}
        </TabsContent>
      </Tabs>
    </div>
  );
}
