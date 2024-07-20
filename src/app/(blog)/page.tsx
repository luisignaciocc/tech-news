import { Viewport } from "next";
import { Suspense } from "react";

import Container from "@/components/container";
import { getMostUsedTags, getPosts, getPostsByTags } from "@/lib/api";
import { defaultMetadata } from "@/lib/metadata";

import {
  HeadlinePosts,
  HeadlinePostsSkeleton,
} from "./components/headline-posts";
import { Intro, IntroSkeleton } from "./components/intro";
import MiniFooter from "./components/mini-footer";
import { MiniFooterSkeleton } from "./components/mini-footer";
import { MoreStoriesSkeleton } from "./components/more-stories";
import MoreStoriesFetcher from "./components/more-stories-fetcher";
import PostVerticalCarousel, {
  PostVerticalCarouselSkeleton,
} from "./components/post-vertical-carousel";
import { PostCarouselSkeleton } from "./components/posts-carousel";
import PostsCarouselFetcher from "./components/posts-carousel-fetcher";
import SecondTagSection, {
  SecondTagSectionSkeleton,
} from "./components/second-tag-section";
import { SpecialSection } from "./components/special-section";
import { SpecialSectionSkeleton } from "./components/special-section";
import TagSection from "./components/tag-section";
import { TagSectionSkeleton } from "./components/tag-section";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const HeroPostsFetcher = async () => {
  const { posts: heroPosts } = await getPosts({ page: 1, perPage: 10 });

  return <PostVerticalCarousel posts={heroPosts} />;
};

const SecondTagsPostsFetcher = async () => {
  const tags = await getMostUsedTags(2);
  const postsByTags = await getPostsByTags([tags[1]], 3);

  return (
    <SecondTagSection secondMostUsedTag={[tags[1]]} postsByTags={postsByTags} />
  );
};

export default async function Index() {
  return (
    <main>
      <Container>
        <Suspense fallback={<IntroSkeleton />}>
          <Intro />
        </Suspense>
        <Suspense fallback={<HeadlinePostsSkeleton />}>
          <div className="flex flex-wrap justify-center mx-5 md:mx-8 xl:mx-14 mb-5">
            <HeadlinePosts />
          </div>
        </Suspense>
        <div className="w-11/12 mx-auto justify-center">
          <div className="flex gap-8 mt-2">
            <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
              <Suspense fallback={<PostVerticalCarouselSkeleton />}>
                <HeroPostsFetcher />
              </Suspense>
              <Suspense
                fallback={
                  <div className="w-8/12">
                    <MoreStoriesSkeleton repeat={4} />
                  </div>
                }
              >
                <MoreStoriesFetcher page={1} perPage={15} />
              </Suspense>
              <Suspense fallback={<SecondTagSectionSkeleton />}>
                <SecondTagsPostsFetcher />
              </Suspense>
            </div>
            <div className="w-4/12 hidden lg:block">
              <Suspense fallback={<SpecialSectionSkeleton />}>
                <SpecialSection />
              </Suspense>
              <Suspense fallback={<TagSectionSkeleton />}>
                <TagSection />
              </Suspense>
              <Suspense fallback={<PostCarouselSkeleton />}>
                <PostsCarouselFetcher />
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
