import React from "react";

import { getRandomPostsFromTwoWeeksAgo } from "@/lib/api";

import PostCarousel from "./posts-carousel";

async function PostsCarouselFetcher() {
  const posts = await getRandomPostsFromTwoWeeksAgo(3);

  return <PostCarousel posts={posts} />;
}

export default PostsCarouselFetcher;
