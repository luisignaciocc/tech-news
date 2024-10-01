import React from "react";

import { getMostUsedTags, getPosts, getPostsByTags } from "@/lib/api";

import { MoreStories } from "./more-stories";
import PostVerticalCarousel from "./post-vertical-carousel";
import SecondTagSection from "./second-tag-section";

interface SecondTagsPostsFetcherProps {
  locale: string;
}

export async function PostsFetcher({ locale }: { locale: string }) {
  const [{ posts, count }] = await Promise.all([
    getPosts({ page: 1, perPage: 21, locale }),
  ]);

  const hasMorePosts = 21 < count;

  return (
    <MoreStories hasMorePosts={hasMorePosts} posts={posts.slice(10, 25)} />
  );
}

export const HeroPostsFetcher = async ({ locale }: { locale: string }) => {
  const { posts: heroPosts } = await getPosts({ page: 1, perPage: 10, locale });

  return <PostVerticalCarousel posts={heroPosts} />;
};

export const SecondTagsPostsFetcher = async ({
  locale,
}: SecondTagsPostsFetcherProps) => {
  const tags = await getMostUsedTags(2, locale);

  // Extrae los nombres de las etiquetas para pasarlos a getPostsByTags
  const tagNames = tags.map((tag) => tag.name); // Obtener solo los nombres

  // Llama a getPostsByTags pasando los nombres de las etiquetas
  const postsByTags = await getPostsByTags([tagNames[1]], 3, locale);

  return (
    <SecondTagSection
      secondMostUsedTag={[tagNames[1]]}
      postsByTags={postsByTags}
    />
  );
};
