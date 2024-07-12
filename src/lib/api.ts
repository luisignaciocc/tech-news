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
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRandomPosts(excludedIds: string[], limit: number) {
  const totalCount = await prisma.post.count({
    where: {
      id: {
        notIn: excludedIds,
      },
    },
  });

  // Obtener una lista de IDs aleatorios que no están en el array excludedIds
  const randomIds = new Set<string>();
  while (randomIds.size < limit && randomIds.size < totalCount) {
    const randomIndex = Math.floor(Math.random() * totalCount);
    const randomId = (
      await prisma.post.findMany({
        where: {
          id: {
            notIn: excludedIds,
          },
        },
        select: {
          id: true,
        },
        skip: randomIndex,
        take: 1,
      })
    )[0]?.id;
    if (randomId) {
      randomIds.add(randomId);
    }
  }

  // Obtener los posts con los IDs aleatorios
  const randomPosts = await prisma.post.findMany({
    where: {
      id: {
        in: Array.from(randomIds),
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
  });

  return randomPosts;
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

    if (!similarNews || similarNews.length === 0) {
      return null;
    }

    // Paso 3: Select a random number of similar news items
    const randomIndex = Math.floor(Math.random() * similarNews.length);
    const selectedSimilarNews = similarNews[randomIndex];

    // Paso 4: Find the post related to the selected news
    const relatedPost = await prisma.post.findFirst({
      where: {
        newId: selectedSimilarNews.id,
      },
      select: {
        id: true,
        coverImage: true,
        title: true,
        slug: true,
        publishedAt: true,
        tags: true,
      },
    });

    return relatedPost ? [relatedPost] : [];
  } catch (error) {
    console.error("Error getting related post:", error);
    return [];
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
    AND 1 - (n.embedding <=> c.comparation_embedding) > 0.6
    ORDER BY similarity DESC;
  `;

    return similarNews;
  } catch (error) {
    console.error("Error getting similar news:", error);
    return [];
  }
}

export async function getMostUsedTags() {
  const mostUsedTags = await prisma.tag.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    select: {
      name: true,
    },
    take: 6,
  });

  return mostUsedTags.map((tag) => tag.name);
}

export const getPostsBySearchTerm = async (
  searchTerm: string,
  numberPosts: number,
) => {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
          },
        },
        {
          tags: {
            some: {
              name: searchTerm,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      coverImage: true,
      createdAt: true,
      excerpt: true,
      author: true,
      tags: true,
    },
    take: numberPosts,
  });

  const count = await prisma.post.count({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
          },
        },
        {
          tags: {
            some: {
              name: searchTerm,
            },
          },
        },
      ],
    },
  });

  return {
    posts,
    count,
  };
};

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
        tags: true,
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
