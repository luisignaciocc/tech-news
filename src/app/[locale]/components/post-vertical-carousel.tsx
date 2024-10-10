"use client";
import "react-loading-skeleton/dist/skeleton.css";

import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import { DateFormatter } from "@/components/date-formatter";
import { Link } from "@/i18n/routing";

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
  locale: string;
};

export function PostVerticalCarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-2">
        <Skeleton height={400} />
      </div>
      <div>
        <Skeleton height={15} width={250} />
        <Skeleton height={30} className="mt-3" />
        <Skeleton height={30} />
        <Skeleton height={20} className="mt-3" />
        <Skeleton height={20} />
      </div>
    </div>
  );
}

export default function PostVerticalCarousel({ posts, locale }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change every 5 seconds
    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [posts.length]);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const handleIndexClick = (index: number) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
  };

  const handleIndexHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleIndexLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="mb-10">
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`absolute left-0 w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] transition-transform duration-1000 ${
                index === activeIndex
                  ? "translate-y-0"
                  : index < activeIndex
                    ? "-translate-y-full"
                    : "translate-y-full"
              }`}
            >
              <div className="mb-4">
                <ZoomImage
                  slug={post.slug}
                  title={post.title}
                  src={post.coverImage || "/api/preview-image"}
                />
              </div>
              <div className="text-sm flex items-center">
                {post.tags.slice(0, 1).map((tag) => (
                  <Link
                    href={`/posts/tags/${tag.name}`}
                    key={tag.id}
                    className="uppercase text-gray-800 mr-2"
                  >
                    {tag.name}
                  </Link>
                ))}
                <span
                  className="mr-2 border-r border border-black h-3"
                  role="none"
                />
                <div className="text-gray-500">
                  {locale === "es" ? (
                    <DateFormatter date={post.publishedAt || new Date()} />
                  ) : (
                    <span>
                      {post.publishedAt
                        ? post.publishedAt.toDateString()
                        : new Date().toDateString()}
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-2xl leading-tight tracking-tighter">
                <Link href={`/posts/${post.slug}`} className={``}>
                  {post.title}
                </Link>
              </h3>
              <p className="text-lg leading-tight tracking-tighter text-gray-500 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {post.excerpt}
              </p>
            </div>
          ))}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2 space-x-0 sm:space-x-0 md:space-x-0 lg:space-x-4 xl:space-x-4">
        <FaChevronUp
          onClick={() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? posts.length - 1 : prevIndex - 1,
            );
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
              setCurrentIndex((prevIndex) =>
                prevIndex === posts.length - 1 ? 0 : prevIndex + 1,
              );
            }, 5000);
          }}
          className="cursor-pointer hover:text-red-400"
        />
        <div className="flex items-center relative">
          <div className="flex items-center">
            {posts.map((post, index) => (
              <div
                key={index}
                role="button"
                className={`px-1 sm:px-1 md:px-1 lg:px-2 xl:px-2 py-1 text-sm sm:text-sm md:text-sm lg:text-lg xl:text-lg font-bold cursor-pointer relative flex justify-center items-center ${
                  index === activeIndex ? "text-red-600" : "text-gray-500"
                }`}
                onClick={() => handleIndexClick(index)}
                onMouseEnter={() => handleIndexHover(index)}
                onMouseLeave={handleIndexLeave}
              >
                {index + 1}
                {index < posts.length - 1 && (
                  <span
                    className="ml-1 sm:ml-1 md:ml-1 lg:ml-4 xl:ml-4 border-r border-gray-400 h-4"
                    role="none"
                  />
                )}
                {hoveredIndex === index && activeIndex !== index && (
                  <div className="absolute bg-white shadow-lg p-2 rounded-md z-10 w-56 h-auto -top-48">
                    <ZoomImage
                      slug={post.slug}
                      title={post.title}
                      src={post.coverImage || "/api/preview-image"}
                    />
                    <p className="text-xs font-bold mt-2 overflow-hidden text-ellipsis -mb-1 line-clamp-3">
                      {post.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <FaChevronDown
          onClick={() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === posts.length - 1 ? 0 : prevIndex + 1,
            );
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
              setCurrentIndex((prevIndex) =>
                prevIndex === posts.length - 1 ? 0 : prevIndex + 1,
              );
            }, 5000);
          }}
          className="cursor-pointer hover:text-red-400"
        />
      </div>
    </div>
  );
}
