import Link from "next/link";
import React, { Fragment } from "react";
import Image from "next/image";

interface SpecialCardPostProps {
  imageUrl: string | null;
  title: string;
  slug: string;
  number: string;
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
          <div className="w-24 h-24 rounded-md overflow-hidden mr-2 relative">
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
