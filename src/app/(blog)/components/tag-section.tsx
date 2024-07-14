import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import Skeleton from "react-loading-skeleton";

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

export function TagSectionSkeleton() {
  return (
    <div className="mt-5">
      <h2 className="text-3xl uppercase font-bold">
        <Skeleton width={200} />
      </h2>
      <hr className="bg-black border-1 border-black" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mt-5">
          <div className="mb-1">
            <Skeleton height={200} />
          </div>
          <div>
            <Skeleton height={15} width={250} />
            <Skeleton height={30} className="mt-3" />
            <Skeleton height={30} />
            <Skeleton height={20} className="mt-3" />
            <Skeleton height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TagSection({
  mostUsedTag,
  postsByTags,
}: MostUsedTagProps) {
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
