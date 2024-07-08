import Link from "next/link";
import React, { Fragment } from "react";

import CoverImage from "@/components/cover-image";
import { DateFormatter } from "@/components/date-formatter";

import markdownStyles from "./markdown-styles.module.css";
import SocialMediaButtons from "./social-media-buttons";

type Props = {
  title: string;
  coverImage: string | null;
  date: Date;
  tags: { id: number; name: string }[];
  excerpt: string | null;
};

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
