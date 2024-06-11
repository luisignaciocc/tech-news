import { Metadata } from "next";
import { Suspense } from "react";

import { MainNav } from "@/app/admin/components/main-nav";
import { Search } from "@/app/admin/components/search";
import TeamSwitcher from "@/app/admin/components/team-switcher";
import { UserNav } from "@/app/admin/components/user-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OverviewSkeleton } from "./components/overview";
import { OverviewContainer } from "./components/overview-container";
import {
  PostsLastSevenDays,
  PostsLastSevenDaysSkeleton,
} from "./components/posts-last-seven-days";
import {
  PostsLastThirtyDays,
  PostsLastThirtyDaysSkeleton,
} from "./components/posts-last-thirty-days";
import RecentPostsCard from "./components/recent-posts-card";
import {
  PostsLastNinetyDays,
  PostsLastNinetyDaysSkeleton,
} from "./components/posts-last-ninety-days";
import {
  PostsLastDay,
  PostsLastDaySkeleton,
} from "./components/posts-last-day";

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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Posts Publicados los Ultimos 7 Dias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<PostsLastSevenDaysSkeleton />}>
                    <PostsLastSevenDays />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Posts Publicados los Ultimos 30 Dias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<PostsLastThirtyDaysSkeleton />}>
                    <PostsLastThirtyDays />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Posts Publicados los Ultimos 90 Dias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<PostsLastNinetyDaysSkeleton />}>
                    <PostsLastNinetyDays />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Posts Publicados las Ultimas 24 Horas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<PostsLastDaySkeleton />}>
                    <PostsLastDay />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Suspense fallback={<OverviewSkeleton />}>
                <OverviewContainer />
              </Suspense>
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
