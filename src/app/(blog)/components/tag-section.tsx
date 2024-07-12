import React from "react";

import { PostPreview } from "./post-preview";

interface PostsByTags {
  id: string;
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
    name: string;
  }[];
  createdAt: Date;
}

interface MostUsedTagProps {
  mostUsedTag: string[];
  postsByTags: PostsByTags[];
}

function TagSection({ mostUsedTag, postsByTags }: MostUsedTagProps) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl uppercase">{mostUsedTag}</h2>
      <hr className="bg-black border-1 border-black mb-6" />
      {postsByTags.slice(0, 3).map((post) => (
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
