import { PrismaClient } from "@prisma/client";

import RecentPosts from "@/app/admin/components/recent-sales";
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

async function CardPosts() {
  const postsCount = await getRecentPostsCount();

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Ultimos Posts Publicados</CardTitle>
          <CardDescription>
            {postsCount} posts publicados los ultimos 7 dias.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentPosts />
        </CardContent>
      </Card>
    </>
  );
}

export default CardPosts;
