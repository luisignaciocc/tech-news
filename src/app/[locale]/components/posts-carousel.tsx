"use client";
import "react-loading-skeleton/dist/skeleton.css";

import React, { Fragment, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { Link } from "@/i18n/routing";

import ZoomImage from "./zoom-image";

interface Post {
  id: string;
  slug: string;
  title: string;
  coverImage: string | null;
  publishedAt: Date | null;
  tags: { id: number; nameEs: string }[];
}

interface PostCarouselProps {
  posts: Post[];
}

export function PostCarouselSkeleton() {
  return (
    <Fragment>
      <Skeleton height={200} className="mt-10" />
      <hr className="mt-4 w-full" />
    </Fragment>
  );
}

const PostCarousel = ({ posts }: PostCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 3000);
    intervalRef.current = interval;

    return () => clearInterval(intervalRef.current);
  }, [posts.length]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 5000);
    intervalRef.current = newInterval;
  };

  return (
    <div className="relative w-full h-56 mt-4 overflow-hidden">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`absolute top-0 left-0 w-full h-52 transition-transform duration-1000 ${
            index === currentIndex
              ? "translate-x-0"
              : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
          }`}
        >
          <div className="relative w-full h-52 overflow-hidden">
            <ZoomImage
              src={post.coverImage || ""}
              title={post.title}
              slug={post.slug}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">
              <Link
                href={`/posts/${post.slug}`}
                className="text-lg hover:text-red-400"
              >
                {post.title}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-2 right-2 flex space-x-2">
        {posts.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-gray-500" : "bg-white"
            }`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCarousel;
