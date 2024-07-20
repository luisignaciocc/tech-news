import React, { Fragment } from "react";

import { getPostsBySearchTerm, getRandomPostsFromTwoWeeksAgo } from "@/lib/api";

import MiniFooter from "../components/mini-footer";
import { MoreStories } from "../components/more-stories";
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
  const perPage = 25;
  const [{ posts }, postsForCarousel] = await Promise.all([
    getPostsBySearchTerm(searchTerm, perPage),
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
        <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
          {posts.length > 0 ? (
            <MoreStories posts={posts} hasMorePosts />
          ) : (
            <div className="bg-gray-900 text-white w-full h-auto py-10 px-12">
              <p className="text-2xl">No hay publicaciones disponibles.</p>
              <p className="mt-5">
                Intenta con otro término de búsqueda, puedes utilizar palabras
                claves o abreviaturas, ejemplo: `ARTIFICIAL` o `IA`.
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
