import "react-loading-skeleton/dist/skeleton.css";

import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

import RecentPosts from "@/app/admin/components/recent-posts";
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

    await new Promise((resolve) => setTimeout(resolve, 5000));

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

async function WrappedCardDescription() {
  const postsCount = await getRecentPostsCount();

  return (
    <>
      <CardDescription>
        {postsCount} posts publicados los ultimos 7 dias.
      </CardDescription>
    </>
  );
}

function CardPosts() {
  return (
    <Suspense
      fallback={
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Ultimos Posts Publicados</CardTitle>
            <CardDescription>
              <Skeleton />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPosts />
          </CardContent>
        </Card>
      }
    >
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Ultimos Posts Publicados</CardTitle>
          <WrappedCardDescription />
        </CardHeader>
        <CardContent>
          <RecentPosts />
        </CardContent>
      </Card>
    </Suspense>
  );
}

export default CardPosts;
