import Image from "next/image";
import React from "react";

import {
  getMostUsedTags,
  getPostsBySearchTerm,
  getPostsByTags,
  getRandomPosts,
} from "@/lib/api";

import MoreStoriesSection from "../components/more-stories-section";
import SpecialSection from "../components/special-section";
import TagSection from "../components/tag-section";

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

  const postIds = posts.map((post) => post.id);

  const specialPosts = await getRandomPosts(postIds, 5);

  const mostUsedTags = await getMostUsedTags(2);
  let mostUsedTag: string[];
  const firstTag = mostUsedTags[0];
  if (firstTag && firstTag.toLowerCase().includes(searchTerm.toLowerCase())) {
    // If they are similar, assign the second result (if it exists)
    mostUsedTag = mostUsedTags[1] ? [mostUsedTags[1]] : [];
  } else {
    // If they are not similar, assign the first result
    mostUsedTag = [firstTag];
  }

  const postsByTags = await getPostsByTags(mostUsedTag, 3);

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
        <MoreStoriesSection
          morePosts={morePosts}
          hasMorePosts={hasMorePosts}
          posts={posts}
        />
        <div className="w-4/12 hidden lg:block">
          <SpecialSection specialPosts={specialPosts} />
          <TagSection mostUsedTag={mostUsedTag} postsByTags={postsByTags} />
        </div>
      </div>
    </div>
  );
}

export default SearchPost;
