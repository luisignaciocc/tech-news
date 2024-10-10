import React from "react";

import { DateFormatter } from "@/components/date-formatter";
import { Link } from "@/i18n/routing";

import ZoomImage from "./zoom-image";

type Props = {
  title: string | React.ReactNode;
  coverImage?: string | null;
  date: Date;
  excerpt?: string | null;
  author: {
    name: string;
    picture: string;
  };
  slug: string;
  tags: {
    name: string;
  }[];
  titleLinkClassName?: string;
  locale: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  tags,
  titleLinkClassName,
  locale,
}: Props) {
  const getTitleAsString = (): string => {
    if (typeof title === "string") {
      return title;
    } else {
      // Get the title if it comes as an element
      const textContent = React.Children.toArray(title).join("");
      return textContent;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <ZoomImage
          slug={slug}
          title={getTitleAsString()}
          src={coverImage || "/api/preview-image"}
        />
      </div>
      <div className="text-sm flex items-center">
        {tags.slice(0, 1).map((tag) => (
          <Link
            href={`/posts/tags/${tag.name}`}
            key={tag.name}
            className="uppercase text-gray-800 mr-2"
          >
            {tag.name}
          </Link>
        ))}
        <span className="mr-2 border-r border border-black h-3" />
        <div className="text-gray-500">
          {locale === "es" ? (
            <DateFormatter date={date} />
          ) : (
            <span>{date.toDateString()}</span>
          )}
        </div>
      </div>
      <h3 className="text-2xl leading-tight tracking-tighter">
        <Link href={`/posts/${slug}`} className={`${titleLinkClassName}`}>
          {title}
        </Link>
      </h3>
      <p className="text-lg leading-tight tracking-tighter text-gray-500 mt-2 line-clamp-3">
        {excerpt}
      </p>
    </div>
  );
}
