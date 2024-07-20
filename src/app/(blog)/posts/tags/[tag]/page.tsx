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
  const searchTerm = decodeURIComponent(params.tag);
  const perPage = 25;
  const [{ posts }] = await Promise.all([
    getPostsBySearchTerm(searchTerm, perPage),
  ]);

  const [postsForCarousel] = await Promise.all([
    getRandomPostsFromTwoWeeksAgo(3),
  ]);

  return (
    <div className="mt-10 mx-6 xl:mx-auto mb-10 xl:max-w-6xl ">
      <div className="flex items-center">
        <span className="uppercase text-4xl mt-4 flex items-center leading-tight tracking-tighter">
          {searchTerm && (
            <Fragment>
              <span className="hidden md:inline-block mr-2">Tag</span>
              <span>{`"${searchTerm}"`}</span>
            </Fragment>
          )}
        </span>
      </div>
      <div className="flex gap-8 mt-2">
        <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
          {posts.length > 0 ? (
            <MoreStories posts={posts} hasMorePosts />
          ) : (
            <div className="bg-gray-900 text-white w-full h-auto py-10 px-12">
              <p className="text-2xl">No hay publicaciones disponibles.</p>
              <p className="mt-5">
                Intenta con otro tag o busca un término diferente.
              </p>
            </div>
          )}
        </div>
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
