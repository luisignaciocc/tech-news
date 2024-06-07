import "react-loading-skeleton/dist/skeleton.css";

import { PrismaClient } from "@prisma/client";
import { Fragment, Suspense } from "react";
import Skeleton from "react-loading-skeleton";

import {
  RecentPosts,
  RecentPostsLoadingSkeleton,
} from "@/app/admin/components/recent-posts-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const getRecentPostsCount = async () => {
  try {
    const prisma = new PrismaClient();

    const postCount = await prisma.post.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return postCount;
  } catch (error) {
    return 0;
  }
};

async function RecentPostsCounter() {
  const postsCount = await getRecentPostsCount();

  return <Fragment>{postsCount} posts publicados los ultimos 7 dias.</Fragment>;
}

function RecentPostsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ultimos Posts Publicados</CardTitle>
        <CardDescription>
          <Suspense fallback={<Skeleton width={250} />}>
            <RecentPostsCounter />
          </Suspense>
        </CardDescription>
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
