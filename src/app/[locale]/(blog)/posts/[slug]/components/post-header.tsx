import "react-loading-skeleton/dist/skeleton.css";

import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import CoverImage from "@/components/cover-image";
import { DateFormatter } from "@/components/date-formatter";
import { Link } from "@/i18n/routing";

import markdownStyles from "./markdown-styles.module.css";
import SocialMediaButtons from "./social-media-buttons";

type Props = {
  title: string;
  coverImage: string | null;
  date: Date;
  tags: { id: number; name: string }[];
  excerpt: string | null;
};

export function PostHeaderSkeleton() {
  return (
    <Fragment>
      <div className="hidden sm:block mb-6 md:mb-6">
        <Skeleton height={450} />
      </div>
      <div className="sm:hidden mb-6 md:mb-6">
        <Skeleton height={200} />
      </div>
      <div className="mb-6 text-lg flex flex-col sm:flex-row items-start justify-start">
        <div className="flex flex-wrap">
          <Skeleton width={120} />
        </div>
        <span className="ml-2 mr-2 hidden sm:inline">|</span>
        <div className="flex items-start">
          <Skeleton width={150} />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-1 w-11/12">
        <Skeleton />
      </h1>
      <h1 className="text-3xl font-bold mb-1 w-full">
        <Skeleton />
      </h1>
      <h1 className="text-3xl font-bold mb-6 w-1/2">
        <Skeleton />
      </h1>
      <div className="mb-1 w-full">
        <Skeleton />
      </div>
      <div className="mb-4 w-3/5">
        <Skeleton />
      </div>
    </Fragment>
  );
}

export function PostHeader({ title, coverImage, date, tags, excerpt }: Props) {
  return (
    <Fragment>
      <div className="mb-6 md:mb-6">
        <CoverImage title={title} src={coverImage!} />
      </div>
      <div className="mb-6 text-lg flex flex-col sm:flex-row items-start justify-start">
        <div className="text-red-600 flex flex-wrap">
          {tags.length > 0 && (
            <React.Fragment>
              <Link href={`/posts/tags/${tags[0].name}`}>
                <span>{tags[0].name.toUpperCase()}</span>
              </Link>
            </React.Fragment>
          )}
        </div>
        <span className="ml-2 mr-2 hidden sm:inline">|</span>
        <div className="flex items-start">
          <DateFormatter date={date} />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <SocialMediaButtons />
      <h2 className={markdownStyles["markdown"]}>{excerpt}</h2>
    </Fragment>
  );
}
