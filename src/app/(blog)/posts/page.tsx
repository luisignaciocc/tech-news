import Image from "next/image";
import React from "react";

import { getPostsBySearchTerm } from "@/lib/api";
import { getPostsCards } from "@/lib/api";

import { MoreStories } from "../components/more-stories";
import { PostPreview } from "../components/post-preview";
import SpecialSection from "../components/special-section";

interface SearchParams {
  s: string;
}

async function SearchPost({ searchParams }: { searchParams: SearchParams }) {
  const searchTerm = searchParams.s;
  const numberPosts = 11;
  const { posts, count } = await getPostsBySearchTerm(searchTerm, numberPosts);

  const morePosts = posts;
  const page = 1;
  const perPage = 6;
  const hasMorePosts = page * perPage < count;

  const specialPosts = await getPostsCards("asdasddas", 5);

  return (
    <div className="mt-20 mx-8 mb-24 xl:mx-28">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src="/icon.png"
            width="100"
            height="100"
            alt="Logotipo de Tecnobuc"
            className="w-[80px] h-[80px] object-cover"
          />
        </div>
        <span className="uppercase text-4xl mt-4 flex items-center leading-tight tracking-tighter">
          <span className="hidden md:inline-block mr-2">Buscando</span>
          <span>{`"${searchParams.s}"`}</span>
          <span className="hidden md:inline-block ml-1">
            {" "}
            : {count} resultados
          </span>
        </span>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
          {morePosts.length > 0 ? (
            <MoreStories
              posts={morePosts.slice(0, 6)}
              hasMorePosts={hasMorePosts}
            />
          ) : (
            <div className="bg-gray-900 text-white w-full h-auto py-10 px-12">
              <p className="text-2xl">No hay publicaciones disponibles.</p>
              <p className="mt-5">Intenta con otro término de búsqueda.</p>
            </div>
          )}
          {posts.length > 6 && (
            <PostPreview
              key={posts[6].slug}
              title={posts[6].title}
              coverImage={posts[6].coverImage}
              date={posts[6].createdAt}
              author={posts[6].author}
              slug={posts[6].slug}
              excerpt={posts[6].excerpt}
              tags={posts[6].tags}
            />
          )}
          {morePosts.length > 0 && (
            <div className="mt-8">
              <MoreStories
                posts={morePosts.slice(7, 11)}
                hasMorePosts={hasMorePosts}
              />
            </div>
          )}
        </div>
        <div className="w-4/12 hidden lg:block">
          <div>
            <SpecialSection specialPosts={specialPosts} />
          </div>
          <div className="mt-20">
            <h2 className="text-3xl uppercase">inteligencia artificial</h2>
            <hr className="bg-black border-1 border-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPost;
