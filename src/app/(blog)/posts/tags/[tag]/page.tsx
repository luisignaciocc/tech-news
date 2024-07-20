import React, { Fragment } from "react";

import MiniFooter from "@/app/(blog)/components/mini-footer";
import { MoreStories } from "@/app/(blog)/components/more-stories";
import PostCarousel from "@/app/(blog)/components/posts-carousel";
import { SpecialSection } from "@/app/(blog)/components/special-section";
import TagSection from "@/app/(blog)/components/tag-section";
import { getPostsBySearchTerm, getRandomPostsFromTwoWeeksAgo } from "@/lib/api";

type Params = {
  params: {
    tag: string;
  };
};

export default async function TagsPage({ params }: Params) {
  const tagTerm = params.tag;
  const numberPosts = 11;
  const [{ posts, count }] = await Promise.all([
    getPostsBySearchTerm(tagTerm, numberPosts),
  ]);

  const page = 1;
  const perPage = 6;
  const hasMorePosts = page * perPage < count;

  const [postsForCarousel] = await Promise.all([
    getRandomPostsFromTwoWeeksAgo(3),
  ]);

  return (
    <div className="mt-10 mx-6 xl:mx-auto mb-10 xl:max-w-6xl ">
      <div className="flex items-center">
        <span className="uppercase text-4xl mt-4 flex items-center leading-tight tracking-tighter">
          {tagTerm && (
            <Fragment>
              <span className="hidden md:inline-block mr-2">Tag</span>
              <span>{`"${tagTerm}"`}</span>
            </Fragment>
          )}
        </span>
      </div>
      <div className="flex gap-8 mt-2">
        <MoreStories hasMorePosts={hasMorePosts} posts={posts} />
        <div className="w-4/12 hidden lg:block">
          <SpecialSection />
          <TagSection searchTerm={tagTerm} />
          <PostCarousel posts={postsForCarousel} />
          <hr className="mt-4 w-full" />
          <MiniFooter />
        </div>
      </div>
    </div>
  );
}
