import React, { Fragment } from "react";

import { getPostsBySearchTerm } from "@/lib/api";

import { MoreStories } from "../components/more-stories";
import SideSection from "../components/side-section";

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
  const [{ posts }] = await Promise.all([
    getPostsBySearchTerm(searchTerm, perPage),
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
          <SideSection searchTag={searchTerm} />
        </div>
      </div>
    </div>
  );
}
