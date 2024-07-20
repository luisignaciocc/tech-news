import React from "react";

import { getPosts, getRandomPostsFromTwoWeeksAgo } from "@/lib/api";

import MiniFooter from "../../components/mini-footer";
import { MoreStories } from "../../components/more-stories";
import PostCarousel from "../../components/posts-carousel";
import { SpecialSection } from "../../components/special-section";
import PageNavigation from "./components/page-navigation";

export default async function SearchPostContent({
  params,
}: {
  params?: {
    page?: string;
  };
}) {
  const page = params?.page ? parseInt(params.page) : 1;
  const perPage = 30;
  const [{ posts, count }, postsForCarousel] = await Promise.all([
    getPosts({
      page,
      perPage,
    }),
    getRandomPostsFromTwoWeeksAgo(3),
  ]);

  const hasMorePosts = page * perPage < count;

  return (
    <div className="mt-10 mx-6 xl:mx-auto mb-10 xl:max-w-6xl ">
      <div className="flex items-center">
        <span className="uppercase text-4xl mt-4 flex items-center leading-tight tracking-tighter">
          <span className="hidden md:inline-block mr-2">
            Posts más antiguos
          </span>
        </span>
      </div>
      <div className="flex gap-8 mt-2">
        <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
          {posts.length > 0 ? (
            <MoreStories posts={posts} />
          ) : (
            <div className="bg-gray-900 text-white w-full h-auto py-10 px-12">
              <p className="text-2xl">No hay mas publicaciones.</p>
            </div>
          )}
        </div>
        <div className="w-4/12 hidden lg:block">
          <SpecialSection />
          <PostCarousel posts={postsForCarousel} />
          <hr className="mt-4 w-full" />
          <MiniFooter />
        </div>
      </div>
      <PageNavigation currentPage={page} hasMorePosts={hasMorePosts} />
    </div>
  );
}
