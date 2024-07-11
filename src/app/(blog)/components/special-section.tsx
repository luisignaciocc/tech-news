import React from "react";

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

function SpecialSection({ specialPosts }: SpecialSectionProps) {
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

export default SpecialSection;
