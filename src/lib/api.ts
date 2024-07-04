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
      publishedAt: true,
      tags: true,
    },
    take: limit,
  });
}

export async function getRelatedPostFromPost(postId: string) {
  try {
    // Step 1: Finding news related to postId
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { new: true },
    });

    if (!post || !post.new) {
      return null;
    }

    const newsId = post.new.id;

    // Step 2: Finding similar news
    const similarNews = await getSimilarNews(newsId);

    if (!similarNews) {
      return null;
    }

    // Step 3: Finding related post
    const relatedPost = await getPostsCards(similarNews.id, 1);

    return relatedPost;
  } catch (error) {
    console.error("Error getting related post:", error);
    return null;
  }
}

async function getSimilarNews(newsId: string) {
  try {
    // Searching for similar news with newsId
    const similarNews: { id: string; similarity: number }[] =
      await prisma.$queryRaw`
      WITH comparation AS (
        SELECT embedding AS comparation_embedding
        FROM "News"
        WHERE id = ${newsId}
      )
      SELECT n.id,
            1 - (n.embedding <=> c.comparation_embedding) AS similarity
      FROM "News" n,
            comparation c
      WHERE n.id != ${newsId}
      AND n.embedding IS NOT NULL
      ORDER BY similarity DESC
      LIMIT 1;
    `;

    if (similarNews.length > 0 && similarNews[0].similarity > 0.6) {
      return similarNews[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting similar news:", error);
    return null;
  }
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
