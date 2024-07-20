import React from "react";

import { getPosts } from "@/lib/api";

import MoreStoriesSection from "./more-stories-section";

interface MoreStoriesFetcherProps {
  page: number;
  perPage: number;
}

async function MoreStoriesFetcher({ page, perPage }: MoreStoriesFetcherProps) {
  const [{ posts, count }] = await Promise.all([getPosts({ page, perPage })]);

  const hasMorePosts = page * perPage < count;

  return <MoreStoriesSection hasMorePosts={hasMorePosts} posts={posts} />;
}

export default MoreStoriesFetcher;
