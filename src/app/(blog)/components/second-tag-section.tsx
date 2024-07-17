import Link from "next/link";
import React from "react";

import ZoomImage from "./zoom-image";

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

interface SecondTagSectionProps {
  secondMostUsedTag: string[];
  postsByTags: PostsByTags[];
}

function SecondTagSection({
  secondMostUsedTag,
  postsByTags,
}: SecondTagSectionProps) {
  return (
    <div className="flex mb-16 mt-5">
      <div className="w-8/12 h-full pr-2">
        <div className="relative">
          <ZoomImage
            title={postsByTags[0].title}
            src={postsByTags[0].coverImage || ""}
            slug={postsByTags[0].slug}
          />
          <div className="absolute top-4 left-0 pl-6 pr-2 bg-black text-white py-1 rounded text-sm uppercase font-bold">
            {secondMostUsedTag}
          </div>
          <Link href={`/posts/${postsByTags[0].slug}`}>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full px-4 pt-2 text-white overflow-hidden text-ellipsis line-clamp-3 hover:text-red-500">
              {postsByTags[0].title}
            </div>
          </Link>
        </div>
      </div>

      <div className="w-4/12 flex flex-col justify-between">
        {postsByTags.slice(1).map((post, index) => (
          <div key={index} className="relative">
            <ZoomImage
              title={post.title}
              src={post.coverImage || ""}
              slug={post.slug}
            />
            <Link href={`/posts/${post.slug}`}>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full px-4 pt-2 text-white overflow-hidden text-ellipsis line-clamp-3 hover:text-red-500">
                {post.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecondTagSection;
