import "react-loading-skeleton/dist/skeleton.css";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { DateTimeFormatter } from "@/components/date-formatter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getRecentsPosts = async () => {
  try {
    const prisma = new PrismaClient();

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        createdAt: true,
        title: true,
        slug: true,
        coverImage: true,
        new: {
          select: {
            id: true,
            url: true,
            source: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        },
      },
    });

    return posts;
  } catch (error) {
    return [];
  }
};

export const RecentPostsLoadingSkeleton = () => {
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

export async function RecentPosts() {
  const posts = await getRecentsPosts();

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <Avatar className="h-9 w-9 rounded">
            <AvatarImage
              src={post.coverImage ? post.coverImage : ""}
              alt="Avatar"
            />
            <AvatarFallback>{post.title[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1 space-y-1">
            {post.new && (
              <div className="flex justify-between items-center">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:underline text-sm font-medium leading-none line-clamp-2 flex-1 mr-4"
                  target="_blank"
                >
                  {post.title}
                </Link>
                <div className="ml-auto whitespace-nowrap">
                  <DateTimeFormatter date={post.createdAt} />
                </div>
              </div>
            )}
            {post.new?.source && (
              <a
                href={post.new.url}
                className="text-sm text-muted-foreground"
                target="_blank"
              >
                <p>{post.new.source.url}</p>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
