import { Viewport } from "next";
import { Suspense } from "react";

import Container from "@/components/container";
import { getPosts } from "@/lib/api";
import {
  getMostUsedTags,
  getPostsByTags,
  getRandomPostsFromPreviousWeek,
} from "@/lib/api";
import { defaultMetadata } from "@/lib/metadata";
import { PER_PAGE } from "@/lib/utils";

import {
  HeadlinePosts,
  HeadlinePostsSkeleton,
} from "./components/headline-posts";
import { Intro, IntroSkeleton } from "./components/intro";
import MiniFooter from "./components/mini-footer";
import { MiniFooterSkeleton } from "./components/mini-footer";
import { MoreStoriesSkeleton } from "./components/more-stories";
import MoreStoriesSection from "./components/more-stories-section";
import PostCarousel from "./components/posts-carousel";
import { PostCarouselSkeleton } from "./components/posts-carousel";
import { SpecialSection } from "./components/special-section";
import { SpecialSectionSkeleton } from "./components/special-section";
import TagSection from "./components/tag-section";
import { TagSectionSkeleton } from "./components/tag-section";

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

  const [firstMostUsedTag, secondMostUsedTag] = await getMostUsedTags(2);

  const [
    postsForHeadline,
    specialPosts,
    firstPostsByTags,
    secondPostsByTags,
    postsForCarousel,
  ] = await Promise.all([
    getRandomPostsFromPreviousWeek(4),
    getRandomPostsFromPreviousWeek(5),
    getPostsByTags([firstMostUsedTag], 3),
    getPostsByTags([secondMostUsedTag], 3),
    getRandomPostsFromPreviousWeek(3),
  ]);

  return (
    <main>
      <Container>
        <Suspense fallback={<IntroSkeleton />}>
          <Intro />
        </Suspense>
        <Suspense fallback={<HeadlinePostsSkeleton />}>
          <div className="flex flex-wrap justify-center mx-5 md:mx-8 xl:mx-14 mb-5">
            <HeadlinePosts postsForHeadline={postsForHeadline} />
          </div>
        </Suspense>
        <div className="w-11/12 mx-auto justify-center">
          <div className="flex gap-8 mt-2">
            <Suspense
              fallback={<MoreStoriesSkeleton repeat={1} isIndex={true} />}
            >
              <MoreStoriesSection
                heroPosts={heroPost}
                morePosts={morePosts}
                hasMorePosts={hasMorePosts}
                posts={posts}
                secondMostUsedTag={[secondMostUsedTag]}
                postsByTags={secondPostsByTags}
              />
            </Suspense>
            <div className="w-4/12 hidden lg:block">
              <Suspense fallback={<SpecialSectionSkeleton />}>
                <SpecialSection specialPosts={specialPosts} />
              </Suspense>
              <Suspense fallback={<TagSectionSkeleton />}>
                <TagSection
                  mostUsedTag={[firstMostUsedTag]}
                  postsByTags={firstPostsByTags}
                />
              </Suspense>
              <Suspense fallback={<PostCarouselSkeleton />}>
                <PostCarousel posts={postsForCarousel} />
              </Suspense>
              <hr className="mt-4 w-full" />
              <Suspense fallback={<MiniFooterSkeleton />}>
                <MiniFooter />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export const metadata = defaultMetadata;
