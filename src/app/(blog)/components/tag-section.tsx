import React from "react";

import { PostPreview } from "./post-preview";

interface MorePosts {
  title: string;
  coverImage: string | null;
  author: {
    id: string;
    name: string;
    picture: string;
  };
  slug: string;
  excerpt: string | null;
  tags: {
    id: number;
    name: string;
  }[];
  id: string;
  createdAt: Date;
}

interface MostUsedTagProps {
  mostUsedTag: string[];
  morePosts: MorePosts[];
}

function TagSection({ mostUsedTag, morePosts }: MostUsedTagProps) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl uppercase">{mostUsedTag}</h2>
      <hr className="bg-black border-1 border-black mb-6" />
      {morePosts.slice(0, 3).map((post) => (
        <div key={post.id} className="mb-7">
          <PostPreview
            title={
              <h3 className="text-xl hover:text-gray-400">{post.title}</h3>
            }
            coverImage={post.coverImage}
            date={post.createdAt}
            author={post.author}
            excerpt={null}
            slug={post.slug}
            tags={post.tags}
          />
        </div>
      ))}
    </div>
  );
}

export default TagSection;
