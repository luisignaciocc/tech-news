import React from "react";

import { getMostUsedTags, getPosts, getPostsByTags } from "@/lib/api";

import MoreStoriesSection from "./more-stories-section";

interface MoreStoriesFetcherProps {
  page: number;
  perPage: number;
}

async function MoreStoriesFetcher({ page, perPage }: MoreStoriesFetcherProps) {
  const [{ posts, count }, secondMostUsedTag] = await Promise.all([
    getPosts({ page, perPage }),
    getMostUsedTags(2),
  ]);

  const heroPost = posts.slice(0, 9).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    publishedAt: post.createdAt,
    tags: post.tags,
  }));

  const morePosts = posts.slice(9);
  const hasMorePosts = page * perPage < count;

  const [secondPostsByTags] = await Promise.all([
    getPostsByTags([secondMostUsedTag[0]], 3),
  ]);

  return (
    <MoreStoriesSection
      heroPosts={heroPost}
      morePosts={morePosts}
      hasMorePosts={hasMorePosts}
      posts={posts}
      secondMostUsedTag={[secondMostUsedTag[0]]}
      postsByTags={secondPostsByTags}
    />
  );
}

export default MoreStoriesFetcher;
