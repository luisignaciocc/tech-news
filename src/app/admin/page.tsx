import { Metadata } from "next";

import { MainNav } from "@/app/admin/components/main-nav";
import { Search } from "@/app/admin/components/search";
import TeamSwitcher from "@/app/admin/components/team-switcher";
import { UserNav } from "@/app/admin/components/user-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CountCard } from "./components/count-card";
import PostsCountCard from "./components/posts-count-card";
import RecentPostsCard from "./components/recent-posts-card";
import {
  countPostsLastDay,
  countPostsLastNinetyDays,
  countPostsLastSevenDays,
  countPostsLastThirtyDays,
} from "./utils/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6 hidden md:block" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Posts</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <CountCard
                title="Publicados los Ultimos 7 Dias"
                getCount={countPostsLastSevenDays}
              />
              <CountCard
                title="Publicados los Ultimos 30 Dias"
                getCount={countPostsLastThirtyDays}
              />
              <CountCard
                title="Publicados los Ultimos 90 Dias"
                getCount={countPostsLastNinetyDays}
              />
              <CountCard
                title="Publicados las Ult. 24 Horas"
                getCount={countPostsLastDay}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4 h-full">
                <PostsCountCard />
              </div>
              <div className="col-span-3">
                <RecentPostsCard />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
