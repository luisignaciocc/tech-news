import { PrismaClient } from "@prisma/client";

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

export default async function RecentPosts() {
  const posts = await getRecentsPosts();

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
            {post.createdAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "numeric",
              day: "numeric",
            })}{" "}
            {post.createdAt.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
