import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import Skeleton from "react-loading-skeleton";

import { MoreStoriesSkeleton } from "./more-stories";
import { TagSectionSkeleton } from "./side-section";
import { MiniFooterSkeleton } from "./side-section";
import { SpecialSectionSkeleton } from "./side-section";

function SearchPageSkeleton() {
  return (
    <div className="mt-10 mx-6 xl:mx-auto mb-10 xl:max-w-6xl ">
      <div className="flex items-center mt-28">
        <Skeleton width={650} height={40} />
      </div>
      <div className="flex gap-4 mt-2">
        <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
          <MoreStoriesSkeleton repeat={6} />
          <div className="mt-4 mb-8">
            <div className="mb-1">
              <Skeleton height={500} />
            </div>
            <div>
              <Skeleton height={15} width={250} />
              <Skeleton height={30} className="mt-3" />
              <Skeleton height={30} />
              <Skeleton height={20} className="mt-3" />
              <Skeleton height={20} />
            </div>
          </div>
          <MoreStoriesSkeleton repeat={4} />
        </div>
        <div className="w-4/12 hidden lg:block">
          <SpecialSectionSkeleton />
          <TagSectionSkeleton />
          <Skeleton height={200} className="mt-10" />
          <hr className="mt-4 w-full" />
          <MiniFooterSkeleton />
        </div>
      </div>
    </div>
  );
}

export default SearchPageSkeleton;
