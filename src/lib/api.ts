import { PrismaClient } from "@prisma/client";

import { Post } from "@/interfaces/post";

const prisma = new PrismaClient();

export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    date: post.publishedAt.toISOString(),
    slug: post.id,
    author: {
      name: post.author.name,
      picture: post.author.picture,
    },
    coverImage: post.urlImage,
    excerpt: post.excerpt,
  }));
}
