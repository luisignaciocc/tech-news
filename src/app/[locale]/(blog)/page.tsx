import type { Metadata } from "next";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import Container from "@/components/container";
import { defaultMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/metadata";

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
              <Suspense fallback={<MoreStoriesSkeleton repeat={4} />}>
                <PostsFetcher />
              </Suspense>
              <Suspense fallback={<SecondTagSectionSkeleton />}>
                <SecondTagsPostsFetcher />
              </Suspense>
            </div>
            <div className="w-4/12 hidden lg:block">
              <SideSection />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Root-layout");

  return {
    ...defaultMetadata,
    metadataBase: new URL(SITE_URL),
    title: `Tecnobuc | ${t("title")}`,
    description: `${t("description")}`,
    openGraph: {
      images: [{ url: "/api/og?title=Tecnobuc" }],
    },
  };
}
