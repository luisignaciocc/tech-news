import React from "react";

import { getMostUsedTags, getPosts, getPostsByTags } from "@/lib/api";

import { MoreStories } from "./more-stories";
import PostVerticalCarousel from "./post-vertical-carousel";
import SecondTagSection from "./second-tag-section";

interface Props {
  locale: string;
}

export async function PostsFetcher({ locale }: Props) {
  const [{ posts, count }] = await Promise.all([
    getPosts({ page: 1, perPage: 21 }),
  ]);

  const hasMorePosts = 21 < count;

  return (
    <MoreStories
      hasMorePosts={hasMorePosts}
      posts={posts.slice(10, 25)}
      locale={locale}
    />
  );
}

export const HeroPostsFetcher = async ({ locale }: Props) => {
  const { posts: heroPosts } = await getPosts({ page: 1, perPage: 10 });

  return <PostVerticalCarousel posts={heroPosts} locale={locale} />;
};

export const SecondTagsPostsFetcher = async ({ locale }: Props) => {
  const tags = await getMostUsedTags(2);
  const postsByTags = await getPostsByTags([tags[1]], 3);

  return (
    <SecondTagSection
      secondMostUsedTag={[tags[1]]}
      postsByTags={postsByTags}
      locale={locale}
    />
  );
};
