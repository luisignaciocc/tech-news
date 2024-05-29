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

export const getAllPosts = async (page: number) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const totalPostCount = await prisma.post.count();
  const totalPages = Math.ceil(totalPostCount / limit);
  const currentPage = page;

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
    skip: offset,
    take: limit,
  });

  const hasMorePosts = currentPage < totalPages;

  return {
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      date: post.createdAt.toISOString(),
      slug: post.slug,
      author: {
        name: post.author.name,
        picture: post.author.picture,
      },
      coverImage: post.coverImage,
      excerpt: post.excerpt,
      ogImage: "/api/og?title=" + encodeURIComponent(post.title),
      content: post.content,
    })),
    hasMorePosts,
  };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type PostsData = ThenArg<ReturnType<typeof getAllPosts>>;
export type Post = PostsData["posts"][number];
