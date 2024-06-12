"use server";

import { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getPostsGroupByDate } from "../utils/prisma";
import PostsCountGraph, { PostsCountGraphSkeleton } from "./posts-count-graph";

async function GraphWrapper() {
  const data = await getPostsGroupByDate();

  return <PostsCountGraph data={data} />;
}

export default async function PostsCountCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Posts</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 pt-6 h-full">
        <Suspense fallback={<PostsCountGraphSkeleton />}>
          <GraphWrapper />
        </Suspense>
      </CardContent>
    </Card>
  );
}
