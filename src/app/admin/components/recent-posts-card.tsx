import "react-loading-skeleton/dist/skeleton.css";

import { Suspense } from "react";

import {
  RecentPosts,
  RecentPostsLoadingSkeleton,
} from "@/app/admin/components/recent-posts-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RecentPostsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ultimos Posts Publicados</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<RecentPostsLoadingSkeleton />}>
          <RecentPosts />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default RecentPostsCard;
