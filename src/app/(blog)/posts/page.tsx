import React, { Fragment } from "react";

import { getPostsBySearchTerm, getRandomPostsFromTwoWeeksAgo } from "@/lib/api";

import MiniFooter from "../components/mini-footer";
import MoreStoriesSection from "../components/more-stories-section";
import PostCarousel from "../components/posts-carousel";
import { SpecialSection } from "../components/special-section";
import TagSection from "../components/tag-section";
interface SearchParams {
  s?: string;
}

export default async function SearchPostContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchTerm = searchParams.s;
  const numberPosts = 11;
  const [{ posts, count }] = await Promise.all([
    getPostsBySearchTerm(searchTerm, numberPosts),
  ]);

  const morePosts = posts;
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
          {searchTerm && (
            <Fragment>
              <span className="hidden md:inline-block mr-2">Buscando</span>
              <span>{`"${searchParams.s}"`}</span>
            </Fragment>
          )}
        </span>
      </div>
      <div className="flex gap-8 mt-2">
        <MoreStoriesSection
          morePosts={morePosts}
          hasMorePosts={hasMorePosts}
          posts={posts}
        />
        <div className="w-4/12 hidden lg:block">
          <SpecialSection />
          <TagSection searchTerm={searchTerm} />
          <PostCarousel posts={postsForCarousel} />
          <hr className="mt-4 w-full" />
          <MiniFooter />
        </div>
      </div>
    </div>
  );
}
