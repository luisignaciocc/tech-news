import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import { getRandomPostsFromTwoWeeksAgo } from "@/lib/api";

import { socialMediaLinks } from "../posts/[slug]/components/social-media-buttons";

export function HeadlinePostsSkeleton() {
  return (
    <div className="flex flex-wrap justify-center mx-10 my-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`relative flex items-start w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 justify-center ${
            index < 1
              ? ""
              : index < 2
                ? "sm:block hidden"
                : index < 3
                  ? "md:block hidden"
                  : index < 4
                    ? "lg:block hidden"
                    : index < 5
                      ? "xl:block hidden"
                      : "hidden"
          }`}
        >
          <div className="w-11/12">
            <Skeleton height={40} />
          </div>
        </div>
      ))}
    </div>
  );
}

export async function HeadlinePosts() {
  const postsForHeadline = await getRandomPostsFromTwoWeeksAgo(4);
  const t = await getTranslations("Headline-posts");

  return (
    <Fragment>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`relative flex items-start w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 justify-center ${
            index < 1
              ? ""
              : index < 2
                ? "sm:block hidden"
                : index < 3
                  ? "md:block hidden"
                  : index < 4
                    ? "lg:block hidden"
                    : index < 5
                      ? "xl:block hidden"
                      : "hidden"
          }`}
        >
          {index < postsForHeadline.length ? (
            <Link href={`/posts/${postsForHeadline[index].slug}`}>
              <div className="mr-5 text-xs font-bold hover:text-gray-400 leading-tight tracking-tight">
                {postsForHeadline[index].title}
              </div>
            </Link>
          ) : (
            <div className="flex justify-center gap-4 mt-2 mb-4">
              <div className="flex items-start justify-center space-x-2">
                {socialMediaLinks.map((socialMedia, index) => (
                  <div
                    className="relative group"
                    key={`social-media-links-navbar-${index}`}
                  >
                    <a
                      href={socialMedia.url}
                      target="_blank"
                      aria-label={`${t("link")} ${socialMedia.name}`}
                    >
                      <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                      <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                        <socialMedia.icon className="text-1xl text-gray-500 transition-color duration-300 group-hover:text-black" />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </Fragment>
  );
}
