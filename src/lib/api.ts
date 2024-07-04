import { PrismaClient } from "@prisma/client";

import { PER_PAGE } from "./utils";

const prisma = new PrismaClient();

export const getPostPages = async () => {
  const perPage = PER_PAGE;
  const totalPosts = await prisma.post.count();

  const numberOfPages = Math.ceil(totalPosts / perPage) - 1; // -1 to exclude the first page, which is the index page

  return Array.from({ length: numberOfPages }, (_, i) => ({
    params: {
      page: (i + 2).toString(),
    },
  }));
};

export const getPostSlugs = async (params?: { limit?: number }) => {
  return prisma.post.findMany({
    select: {
      slug: true,
    },
    take: params?.limit,
  });
};

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      author: true,
      tags: true,
    },
  });
}

export async function getPostsCards(id: string, limit: number) {
  return prisma.post.findMany({
    where: {
      id: {
        not: id,
      },
    },
    select: {
      id: true,
      coverImage: true,
      title: true,
      slug: true,
      tags: true,
    },
    take: limit,
  });
}

export const getPosts = async (params?: {
  page?: number;
  perPage?: number;
}) => {
  const limit = params?.perPage || PER_PAGE;
  const offset = ((params?.page || 1) - 1) * limit;
  const [posts, count] = await Promise.all([
    prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
      skip: offset,
      take: limit,
    }),
    prisma.post.count(),
  ]);

  return {
    posts,
    count,
  };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type PostsData = ThenArg<ReturnType<typeof getPosts>>;
export type Post = PostsData["posts"][number];
