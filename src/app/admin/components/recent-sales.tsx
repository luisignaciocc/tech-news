"use client";

import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";

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

export function RecentPosts() {
  const [posts, setPosts] = useState<
    {
      id: string;
      title: string;
      createdAt: Date;
      coverImage: string | null;
      new: {
        id: string;
        url: string;
        source: {
          id: number;
          url: string;
        } | null;
      } | null;
    }[]
  >([]);

  useEffect(() => {
    getLastsPosts();
  }, []);

  const getLastsPosts = async () => {
    const lastsPosts = await getRecentsPosts();
    setPosts(lastsPosts);
  };

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={post.coverImage ? post.coverImage : ""}
              alt="Avatar"
            />
            <AvatarFallback>{post.title[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            {post.new && (
              <a
                href={post.new.url}
                className="text-sm font-medium leading-none"
              >
                {post.title}
              </a>
            )}
            {post.new?.source && (
              <p className="text-sm text-muted-foreground">
                {post.new.source.url}
              </p>
            )}
          </div>
          <div className="ml-auto font-medium">
            {post.createdAt.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
