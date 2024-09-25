import { Viewport } from "next";
import { Suspense } from "react";

import Container from "@/components/container";
import { defaultMetadata } from "@/lib/metadata";

import {
  HeadlinePosts,
  HeadlinePostsSkeleton,
} from "./components/headline-posts";
import { Intro, IntroSkeleton } from "./components/intro";
import {
  HeroPostsFetcher,
  PostsFetcher,
  SecondTagsPostsFetcher,
} from "./components/main-page-fetchers";
import { MoreStoriesSkeleton } from "./components/more-stories";
import { PostVerticalCarouselSkeleton } from "./components/post-vertical-carousel";
import { SecondTagSectionSkeleton } from "./components/second-tag-section";
import SideSection from "./components/side-section";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function Index({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <Container>
        <Suspense fallback={<IntroSkeleton />}>
          <Intro locale={params.locale} />
        </Suspense>
        <Suspense fallback={<HeadlinePostsSkeleton />}>
          <div className="flex flex-wrap justify-center mx-5 md:mx-8 xl:mx-14 mb-5">
            <HeadlinePosts locale={params.locale} />
          </div>
        </Suspense>
        <div className="w-11/12 mx-auto justify-center">
          <div className="flex gap-8 mt-2">
            <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
              <Suspense fallback={<PostVerticalCarouselSkeleton />}>
                <HeroPostsFetcher locale={params.locale} />
              </Suspense>
              <Suspense fallback={<MoreStoriesSkeleton repeat={4} />}>
                <PostsFetcher locale={params.locale} />
              </Suspense>
              <Suspense fallback={<SecondTagSectionSkeleton />}>
                <SecondTagsPostsFetcher locale={params.locale} />
              </Suspense>
            </div>
            <div className="w-4/12 hidden lg:block">
              <SideSection locale={params.locale} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export const metadata = defaultMetadata;
