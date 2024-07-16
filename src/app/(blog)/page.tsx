import { Viewport } from "next";
import { Suspense } from "react";

import Container from "@/components/container";
import { getPosts } from "@/lib/api";
import { defaultMetadata } from "@/lib/metadata";
import { PER_PAGE } from "@/lib/utils";

import DashboardTagsFetcher from "./components/dashboard-tags-fetcher";
import { HeroPost } from "./components/hero-post";
import { Intro } from "./components/intro";
import { MoreStories } from "./components/more-stories";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function Index({
  params,
}: {
  params?: { page?: string };
}) {
  const page = params?.page ? parseInt(params.page) : 1;
  const perPage = PER_PAGE;
  const { posts, count } = await getPosts({ page, perPage });

  const heroPost = posts[0];
  const morePosts = posts.slice(1);
  const hasMorePosts = page * perPage < count;

  return (
    <main>
      <Suspense
        fallback={
          <div className="h-16 bg-gray-100 fixed top-0 left-0 right-0 z-50" />
        }
      >
        <DashboardTagsFetcher />
      </Suspense>
      <Container>
        <div className="w-11/12 mx-auto justify-center">
          <Intro />
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.createdAt}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
          {morePosts.length > 0 && (
            <MoreStories posts={morePosts} hasMorePosts={hasMorePosts} />
          )}
        </div>
      </Container>
    </main>
  );
}

export const metadata = defaultMetadata;
