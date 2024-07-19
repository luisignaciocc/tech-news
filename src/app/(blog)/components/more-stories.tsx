import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";

import { PostPreview } from "./post-preview";
import { PostVerticalCarouselSkeleton } from "./post-vertical-carousel";
import { SecondTagSectionSkeleton } from "./second-tag-section";

type Props = {
  posts: {
    slug: string;
    title: string;
    coverImage: string | null;
    createdAt: Date;
    excerpt: string | null;
    author: {
      name: string;
      picture: string;
    };
    tags: {
      name: string;
    }[];
  }[];
  hasMorePosts?: boolean;
};

interface MoreStoriesSkeletonProps {
  repeat: number;
  isIndex?: boolean;
}

export function MoreStoriesSkeleton({
  repeat,
  isIndex,
}: MoreStoriesSkeletonProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-6 gap-y-20 md:gap-y-8 mb-8">
        {isIndex && (
          <div className="col-span-full">
            <PostVerticalCarouselSkeleton />
          </div>
        )}
        {Array.from({ length: repeat }).map((_, index) => (
          <div key={index}>
            <div className="mb-1">
              <Skeleton height={150} />
            </div>
            <div>
              <Skeleton height={15} width={250} />
              <Skeleton height={30} className="mt-3" />
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={20} className="mt-3" />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </div>
          </div>
        ))}
        {isIndex && (
          <div className="col-span-full">
            <SecondTagSectionSkeleton />
          </div>
        )}
      </div>
    </section>
  );
}

export function MoreStories({ posts, hasMorePosts }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-6 gap-y-20 md:gap-y-8 mb-8">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.createdAt}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
            titleLinkClassName="hover:underline"
          />
        ))}
        {hasMorePosts && (
          <Link href="/record/2">
            <div className="h-full flex items-center justify-center group ">
              <div className="mx-3 bg-primary border border-primary text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 group-hover:bg-white group-hover:text-black">
                Ver posts mas antiguos
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
