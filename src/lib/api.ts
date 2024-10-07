"use server";
import { Prisma } from "@prisma/client";

import prisma from "./prisma";
import { PER_PAGE } from "./utils";

const normalizeLocale = (locale: string) => {
  return locale.charAt(0).toUpperCase() + locale.slice(1); // Convert the first letter to uppercase
};

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

export async function getPostBySlug(slug: string, locale: string) {
  const normalizedLocale = normalizeLocale(locale);

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      author: true,
      tags: {
        select: {
          id: true,
          [`name${normalizedLocale}`]: true,
        },
      },
    },
  });

  // Transform the post if it exists
  if (post) {
    // Find the corresponding language record
    const languageRecord = await prisma.languages.findFirst({
      where: {
        postId: post.id,
        locale: locale,
      },
    });

    // If there is a language record, use those values; otherwise, use the post's values
    const title = languageRecord ? languageRecord.title : post.title;
    const content = languageRecord ? languageRecord.content : post.content;
    const excerpt = languageRecord ? languageRecord.excerpt : post.excerpt;

    const transformedPost = {
      id: post.id,
      slug: post.slug,
      title,
      content,
      createdAt: post.createdAt,
      coverImage: post.coverImage,
      authorId: post.authorId,
      excerpt,
      publishedAt: post.publishedAt,
      author: {
        id: post.author.id,
        name: post.author.name,
        picture: post.author.picture,
      },
      tags: post.tags.map((tag) => ({
        id: Number(tag.id),
        name: tag[`name${normalizedLocale}`] as unknown as string,
      })),
    };

    return transformedPost; // Return the transformed post
  }

  return null; // Return null if the post is not found
}

export async function getTags() {
  return prisma.tag.findMany();
}

export async function getPostsCards(
  slug: string,
  limit: number,
  locale: string,
) {
  const normalizedLocale = normalizeLocale(locale);

  const posts = await prisma.post.findMany({
    where: {
      slug: {
        not: slug,
      },
    },
    select: {
      id: true,
      coverImage: true,
      title: true,
      slug: true,
      publishedAt: true,
      tags: {
        select: {
          id: true,
          [`name${normalizedLocale}`]: true,
        },
      },
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get the title in the corresponding locale
  const transformedPosts = await Promise.all(
    posts.map(async (post) => {
      // Find the corresponding language record
      const languageRecord = await prisma.languages.findFirst({
        where: {
          postId: post.id,
          locale: locale,
        },
      });

      const title = languageRecord ? languageRecord.title : post.title;

      // Transform the data
      return {
        id: post.id,
        coverImage: post.coverImage,
        title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        tags: post.tags.map((tag) => ({
          id: Number(tag.id),
          name: tag[`name${normalizedLocale}`] as unknown as string,
        })),
      };
    }),
  );

  return transformedPosts;
}

export async function getRandomPostsFromTwoWeeksAgo(
  limit: number,
  locale: string,
) {
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const totalCount = await prisma.post.count({
    where: {
      publishedAt: {
        gte: twoWeeksAgo,
      },
    },
  });

  // Get a list of random IDs of posts published in the last week
  const randomIds = new Set<string>();
  while (randomIds.size < limit && randomIds.size < totalCount) {
    const randomIndex = Math.floor(Math.random() * totalCount);
    const randomId = (
      await prisma.post.findMany({
        where: {
          publishedAt: {
            gte: twoWeeksAgo,
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

  const normalizedLocale = normalizeLocale(locale);

  // Get the posts with random IDs
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
      tags: {
        select: {
          id: true,
          [`name${normalizedLocale}`]: true,
        },
      },
    },
  });

  // Get the title in the corresponding locale
  const transformedPosts = await Promise.all(
    randomPosts.map(async (post) => {
      // Find the corresponding language record
      const languageRecord = await prisma.languages.findFirst({
        where: {
          postId: post.id,
          locale: locale,
        },
      });

      const title = languageRecord ? languageRecord.title : post.title;

      // Translate the data
      return {
        id: post.id,
        coverImage: post.coverImage,
        title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        tags: post.tags.map((tag) => ({
          id: Number(tag.id),
          name: tag[`name${normalizedLocale}`] as unknown as string,
        })),
      };
    }),
  );

  return transformedPosts;
}

export async function getRelatedPostFromPostSlug(slug: string, locale: string) {
  try {
    // Step 1: Finding news related to postId
    const post = await prisma.post.findUnique({
      where: { slug },
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

    // Step 3: Select a random number of similar news items
    const randomIndex = Math.floor(Math.random() * similarNews.length);
    const selectedSimilarNews = similarNews[randomIndex];

    const normalizedLocale = normalizeLocale(locale);

    // Step 4: Find the post related to the selected news
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
        tags: {
          select: {
            id: true,
            [`name${normalizedLocale}`]: true,
          },
        },
      },
    });

    if (!relatedPost) {
      return [];
    }

    // Find the corresponding language record
    const languageRecord = await prisma.languages.findFirst({
      where: {
        postId: relatedPost.id,
        locale: locale,
      },
    });

    const title = languageRecord ? languageRecord.title : relatedPost.title;

    // Transform the data
    return [
      {
        id: relatedPost.id,
        coverImage: relatedPost.coverImage,
        title,
        slug: relatedPost.slug,
        publishedAt: relatedPost.publishedAt,
        tags: relatedPost.tags.map((tag) => ({
          id: Number(tag.id),
          name: tag[`name${normalizedLocale}`] as unknown as string,
        })),
      },
    ];
  } catch (error) {
    console.error("Error getting related post:", error);
    return [];
  }
}

export async function getSimilarNews(newsId: string) {
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

export async function getMostUsedTags(limit: number, locale: string) {
  const normalizedLocale = normalizeLocale(locale);
  const mostUsedTags = await prisma.tag.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    select: {
      [`name${normalizedLocale}`]: true,
    },
    take: limit,
  });

  return mostUsedTags.map((tag) => ({
    name: tag[`name${normalizedLocale}`] as unknown as string,
  }));
}

export async function getPostsByTags(
  tags: string[],
  limit: number,
  locale: string,
) {
  const normalizedLocale = normalizeLocale(locale);
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          [`name${normalizedLocale}`]: {
            in: tags,
          },
        },
      },
    },
    select: {
      id: true,
      coverImage: true,
      title: true,
      slug: true,
      createdAt: true,
      excerpt: true,
      author: {
        select: {
          id: true,
          name: true,
          picture: true,
        },
      },
      tags: {
        select: {
          [`name${normalizedLocale}`]: true,
        },
      },
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get the title and excerpt in the corresponding locale
  const transformedPosts = await Promise.all(
    posts.map(async (post) => {
      // Find the corresponding language record for the title and excerpt
      const languageRecord = await prisma.languages.findFirst({
        where: {
          postId: post.id,
          locale: locale,
        },
      });

      const title = languageRecord ? languageRecord.title : post.title;
      const excerpt = languageRecord ? languageRecord.excerpt : post.excerpt;

      // Transform the data
      return {
        id: post.id,
        title,
        coverImage: post.coverImage,
        slug: post.slug,
        createdAt: post.createdAt,
        excerpt,
        author: {
          id: post.author.id,
          name: post.author.name,
          picture: post.author.picture,
        },
        tags: post.tags.map((tag) => ({
          name: tag[`name${normalizedLocale}`] as unknown as string,
        })),
      };
    }),
  );

  return transformedPosts;
}

export const getPostsBySearchTerm = async (
  searchTerm: string = "",
  numberPosts: number,
  locale: string,
) => {
  const normalizedLocale = normalizeLocale(locale);

  const where: Prisma.PostWhereInput = {
    OR: [
      {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        tags: {
          some: {
            [`name${normalizedLocale}`]: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      },
      {
        content: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    ],
  };

  const [posts, count] = await Promise.all([
    prisma.post.findMany({
      where,
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
        tags: {
          select: {
            id: true,
            [`name${normalizedLocale}`]: true,
          },
        },
      },
      take: numberPosts,
    }),
    prisma.post.count({
      where,
    }),
  ]);

  // Get the title and excerpt in the corresponding locale
  const transformedPosts = await Promise.all(
    posts.map(async (post) => {
      // Find the corresponding language record for the title and the excerpt
      const languageRecord = await prisma.languages.findFirst({
        where: {
          postId: post.id,
          locale: locale,
        },
      });

      const title = languageRecord ? languageRecord.title : post.title;
      const excerpt = languageRecord ? languageRecord.excerpt : post.excerpt;

      // Transform the data
      return {
        ...post,
        title,
        excerpt,
        tags: post.tags.map((tag) => ({
          id: tag.id,
          name: tag[`name${normalizedLocale}`] as unknown as string,
        })),
      };
    }),
  );

  return {
    posts: transformedPosts,
    count,
  };
};

export const getPosts = async (params?: {
  page?: number;
  perPage?: number;
  locale?: string;
}) => {
  const limit = params?.perPage || PER_PAGE;
  const offset = ((params?.page || 1) - 1) * limit;
  const locale = params?.locale || "es";
  const normalizedLocale = normalizeLocale(locale);

  const [posts, count] = await Promise.all([
    prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        tags: {
          select: {
            id: true,
            [`name${normalizedLocale}`]: true,
          },
        },
      },
      skip: offset,
      take: limit,
    }),
    prisma.post.count(),
  ]);

  // Get the title and excerpt in the corresponding locale
  const transformedPosts = await Promise.all(
    posts.map(async (post) => {
      // Find the corresponding language record for the title and the excerpt
      const languageRecord = await prisma.languages.findFirst({
        where: {
          postId: post.id,
          locale: locale,
        },
      });

      const title = languageRecord ? languageRecord.title : post.title;
      const excerpt = languageRecord ? languageRecord.excerpt : post.excerpt;

      // Transform the data
      return {
        ...post,
        title,
        excerpt,
        tags: post.tags.map((tag) => ({
          id: Number(tag.id),
          name: tag[`name${normalizedLocale}`] as unknown as string,
        })),
      };
    }),
  );

  return {
    posts: transformedPosts,
    count,
  };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type PostsData = ThenArg<ReturnType<typeof getPosts>>;
export type Post = PostsData["posts"][number];
