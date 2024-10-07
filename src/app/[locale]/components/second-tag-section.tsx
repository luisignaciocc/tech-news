"use client";
import "react-loading-skeleton/dist/skeleton.css";

import { useTranslations } from "next-intl";
import React, { Fragment, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import { Link } from "@/i18n/routing";

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

export function SecondTagSectionSkeleton() {
  return (
    <div className="hidden lg:block">
      <div className="flex mb-16 mt-5">
        <div className="w-8/12 h-full mr-2">
          <Skeleton height={300} />
        </div>
        <div className="w-4/12 flex flex-col justify-between">
          <Skeleton height={145} />
          <Skeleton height={145} />
        </div>
      </div>
    </div>
  );
}

function SecondTagSection({
  secondMostUsedTag,
  postsByTags,
}: SecondTagSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + postsByTags.length) % postsByTags.length,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % postsByTags.length);
  };

  const t = useTranslations("Second-tag-section");

  return (
    <Fragment>
      {/* Version para pantallas grandes */}
      <div className="hidden lg:block">
        <div className="flex mb-16 mt-5">
          <div className="w-8/12 h-full mr-2">
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
      </div>

      {/* Version para mobile */}
      <div className="mb-8 block lg:hidden">
        <div className="carousel relative h-auto overflow-hidden">
          <div className="carousel-items h-full">
            {postsByTags.map((post, index) => (
              <div
                key={index}
                className={`carousel-item h-full ${
                  index === currentIndex ? "" : "hidden"
                }`}
              >
                <div className="h-full flex items-center justify-center">
                  <ZoomImage
                    title={post.title}
                    src={post.coverImage || ""}
                    slug={post.slug}
                  />
                </div>
                <div className="absolute top-4 left-0 pl-6 pr-2 bg-black text-white py-1 rounded text-sm uppercase font-bold sm:text-base">
                  {secondMostUsedTag}
                </div>
                <Link href={`/posts/${post.slug}`}>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full px-4 pt-2 text-white overflow-hidden text-ellipsis line-clamp-3 hover:text-red-500 text-sm sm:text-base">
                    {post.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="carousel-controls absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 sm:px-6">
            <button
              id="prev-btn"
              aria-label={t("prev-button")}
              onClick={handlePrevClick}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black sm:p-3"
            >
              <FaChevronLeft className="text-base sm:text-xl" />
            </button>
            <button
              id="next-btn"
              aria-label={t("next-button")}
              onClick={handleNextClick}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black sm:p-3"
            >
              <FaChevronRight className="text-base sm:text-xl" />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SecondTagSection;
