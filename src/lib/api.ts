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

export const getPosts = async (params?: {
  page?: number;
  perPage?: number;
}) => {
  const limit = params?.perPage || 10;
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
    count,
  };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type PostsData = ThenArg<ReturnType<typeof getPosts>>;
export type Post = PostsData["posts"][number];
