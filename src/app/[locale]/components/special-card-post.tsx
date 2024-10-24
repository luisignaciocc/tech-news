import React, { Fragment } from "react";

import { Link } from "@/i18n/routing";

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
      <Link
        href={`/posts/${slug}`}
        className="flex flex-row items-start w-full mt-3"
      >
        <div className="w-24 h-24 rounded-md overflow-hidden mr-2 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl || ""}
            alt={title}
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 p-1 rounded">
            <span className="text-white text-2xl font-bold">{number}</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-4 hover:text-gray-400 leading-tight tracking-tighter">
            {title}
          </h3>
        </div>
      </Link>
    </Fragment>
  );
};
