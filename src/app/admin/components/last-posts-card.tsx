import "react-loading-skeleton/dist/skeleton.css";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import Skeleton from "react-loading-skeleton";

import RecentPosts from "@/app/admin/components/recent-posts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

async function RecentPostsCounter() {
  const postsCount = await getRecentPostsCount();

  return <Fragment>{postsCount} posts publicados los ultimos 7 dias.</Fragment>;
}

const RecentPostsLoadingSkeleton = () => {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9 rounded">
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1 space-y-1">
            <div className="flex justify-between items-center">
              <Link
                href="#"
                className="hover:underline text-sm font-medium leading-none line-clamp-2 flex-1 mr-4"
              >
                <Skeleton width={300} />
              </Link>
              <div className="ml-auto whitespace-nowrap">
                <Skeleton width={100} />
              </div>
            </div>
            <a href="#" className="text-sm text-muted-foreground">
              <p>
                <Skeleton width={150} />
              </p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

function LastPostsCard() {
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

export default LastPostsCard;
