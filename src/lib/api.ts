import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";

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

export const getAllPosts = async (page: number = 1) => {
  const limit = 6;
  const offset = (page - 1) * limit;

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

  return posts.map((post) => ({
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
  }));
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type Post = ThenArg<ReturnType<typeof getAllPosts>>[number];

export const getStaticProps: GetStaticProps = async (context) => {
  const page = parseInt(context.params?.page as string) || 1;
  const posts = await getAllPosts(page);

  return {
    props: {
      posts,
      currentPage: page,
    },
  };
};
