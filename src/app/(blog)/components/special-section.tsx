import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import Skeleton from "react-loading-skeleton";

import { SpecialCardPost } from "./special-card-post";

interface SpecialPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  publishedAt: Date | null;
  tags: {
    id: number;
    name: string;
  }[];
}

interface SpecialSectionProps {
  specialPosts: SpecialPost[];
}

export function SpecialSectionSkeleton() {
  return (
    <div>
      <h2 className="text-3xl uppercase font-bold">
        <Skeleton width={200} />
      </h2>
      <hr className="bg-black border-1 border-black" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col items-start w-full mt-3 mr-5"
        >
          <div className="flex flex-row w-full">
            <div className="w-1/3 mr-2">
              <Skeleton height={100} width={100} />
            </div>
            <div className="w-2/3">
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </div>
          </div>
          <hr className="mt-6 w-full" />
        </div>
      ))}
    </div>
  );
}

export function SpecialSection({ specialPosts }: SpecialSectionProps) {
  return (
    <div>
      <h2 className="text-3xl uppercase font-bold">Especiales</h2>
      <hr className="bg-black border-1 border-black" />
      {specialPosts.map((post, index) => (
        <div
          key={index}
          className="relative flex flex-col items-start w-full mt-3 mr-5"
        >
          <SpecialCardPost
            key={index}
            imageUrl={post.coverImage || ""}
            title={post.title}
            slug={post.slug}
            number={`${(index + 1).toString().padStart(2, "0")}`}
          />
          {index !== specialPosts.length - 1 && <hr className="mt-6 w-full" />}
        </div>
      ))}
    </div>
  );
}
