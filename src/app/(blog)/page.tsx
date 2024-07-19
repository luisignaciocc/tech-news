import { Viewport } from "next";
import { Suspense } from "react";

import Container from "@/components/container";
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
import MoreStoriesFetcher from "./components/more-stories-fetcher";
import { PostCarouselSkeleton } from "./components/posts-carousel";
import PostsCarouselFetcher from "./components/posts-carousel-fetcher";
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
            <Suspense
              fallback={
                <div className="w-8/12">
                  <MoreStoriesSkeleton repeat={4} isIndex={true} />
                </div>
              }
            >
              <MoreStoriesFetcher page={page} perPage={perPage} />
            </Suspense>
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
