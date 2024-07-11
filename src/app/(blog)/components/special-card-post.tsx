import "react-loading-skeleton/dist/skeleton.css";

import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

interface SpecialCardPostProps {
  imageUrl: string | null;
  title: string;
  slug: string;
  number: string;
}

export function SpecialCardPostSkeleton() {
  return (
    <div className="flex items-center w-full max-w-[280px] mt-3 mr-5">
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

export const SpecialCardPost: React.FC<SpecialCardPostProps> = ({
  imageUrl,
  title,
  slug,
  number,
}) => {
  return (
    <Fragment>
      <div className="flex flex-row items-start w-full mt-3">
        <Link href={`/posts/${slug}`}>
          <div className="w-[100px] h-[100px] rounded-md overflow-hidden mr-2 relative">
            <Image
              src={imageUrl || ""}
              alt={title}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-2 left-4 text-white text-2xl font-bold">
              {number}
            </div>
          </div>
        </Link>
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-4 hover:text-gray-400 leading-tight tracking-tighter">
            <Link href={`/posts/${slug}`}>{title}</Link>
          </h3>
        </div>
      </div>
    </Fragment>
  );
};
