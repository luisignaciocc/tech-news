import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import Skeleton from "react-loading-skeleton";

import { Link } from "@/i18n/routing";

interface PostCardProps {
  imageUrl: string | null;
  title: string;
  tags: { id: number; name: string }[];
  slug: string;
}

export function PostCardLoadingSkeleton() {
  return (
    <div className="flex items-center w-full max-w-72 mt-3 mr-5">
      <div className="w-1/3 mr-5">
        <Skeleton width={100} height={55} />
      </div>
      <div className="w-2/3 p-2">
        <Skeleton height={12} />
        <Skeleton height={12} width={110} />
        <Skeleton height={12} />
        <Skeleton height={12} width={80} />
      </div>
    </div>
  );
}

export const PostCard: React.FC<PostCardProps> = ({
  imageUrl,
  title,
  tags,
  slug,
}) => {
  return (
    <div className="flex items-center w-full max-w-96 mt-3">
      <div className="w-1/3">
        <Link href={`/posts/${slug}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl || ""}
            alt={title}
            className="w-full h-full object-cover"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="w-2/3 p-2">
        <h3 className="text-sm font-bold mb-1 line-clamp-2 hover:text-red-600">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h3>
        <p className="text-red-600 text-xs line-clamp-2">
          {tags.map((tag, index) => (
            <React.Fragment key={index}>
              <Link href={`/posts/tags/${tag.name}`}>
                <span className="hover:underline">
                  {tag.name.toLocaleLowerCase()}
                </span>
              </Link>
              {index < tags.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};
