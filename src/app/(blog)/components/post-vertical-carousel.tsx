"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { DateFormatter } from "@/components/date-formatter";

import ZoomImage from "./zoom-image";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  tags: { id: number; name: string }[];
}

type Props = {
  posts: Post[];
};

export default function PostVerticalCarousel({ posts }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleIndexClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mb-10">
      <div className="mb-4">
        <ZoomImage
          slug={posts[currentIndex].slug}
          title={posts[currentIndex].title}
          src={posts[currentIndex].coverImage || "/api/preview-image"}
        />
      </div>
      <div className="text-sm flex items-center">
        {posts[currentIndex].tags.slice(0, 1).map((tag) => (
          <Link
            href={`/posts/tags/${tag.name}`}
            key={tag.id}
            className="uppercase text-gray-800 mr-2"
          >
            {tag.name}
          </Link>
        ))}
        <span className="mr-2 border-r border border-black h-3"></span>
        <div className="text-gray-500">
          <DateFormatter date={posts[currentIndex].publishedAt || new Date()} />
        </div>
      </div>
      <h3 className="text-2xl leading-tight tracking-tighter line-clamp-2 overflow-hidden">
        <Link href={`/posts/${posts[currentIndex].slug}`} className={``}>
          {posts[currentIndex].title}
        </Link>
      </h3>
      <p className="text-lg leading-tight tracking-tighter text-gray-500 mt-2 line-clamp-3 overflow-hidden">
        {posts[currentIndex].excerpt}
      </p>
      <div className="flex justify-center items-center space-x-4 mt-4">
        <FaChevronDown
          onClick={handlePrevClick}
          className="cursor-pointer hover:text-red-400"
        />
        <div className="flex items-center">
          {posts.map((_, index) => (
            <div
              key={index}
              className={`px-2 py-1 text-lg font-bold cursor-pointer ${
                index === currentIndex ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => handleIndexClick(index)}
            >
              {index + 1}
              {index < posts.length - 1 && (
                <span className="ml-4 border-r border-gray-400 h-4"></span>
              )}
            </div>
          ))}
        </div>
        <FaChevronUp
          onClick={handleNextClick}
          className="cursor-pointer hover:text-red-400"
        />
      </div>
    </div>
  );
}
