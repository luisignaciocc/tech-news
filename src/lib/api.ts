import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostSlugs = async () => {
  return prisma.post.findMany({
    select: {
      slug: true,
    },
  });
};

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      author: true,
    },
  });
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      author: true,
    },
  });

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    date: post.date.toISOString(),
    slug: post.slug,
    author: {
      name: post.author.name,
      picture: post.author.picture,
    },
    coverImage: post.coverImage,
    excerpt: post.excerpt,
    ogImage: post.ogImage,
    content: post.content,
  }));
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type Post = ThenArg<ReturnType<typeof getAllPosts>>[number];
