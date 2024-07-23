import "react-loading-skeleton/dist/skeleton.css";

import Image from "next/image";
import React, { Fragment } from "react";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

import { getMostUsedTags } from "@/lib/api";
import { getPostsByTags } from "@/lib/api";
import { getRandomPostsFromTwoWeeksAgo } from "@/lib/api";
import { SITE_AUTHOR, SITE_AUTHOR_URL } from "@/lib/metadata";

import { socialMediaLinks } from "../posts/[slug]/components/social-media-buttons";
import { PostPreview } from "./post-preview";
import PostCarousel from "./posts-carousel";
import { PostCarouselSkeleton } from "./posts-carousel";
import { SpecialCardPost } from "./special-card-post";

interface SideSectionProps {
  searchTag?: string;
}

interface TagSectionProps {
  searchTerm?: string;
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

export async function SpecialSection() {
  const specialPosts = await getRandomPostsFromTwoWeeksAgo(5);

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

export function TagSectionSkeleton() {
  return (
    <div className="mt-5">
      <h2 className="text-3xl uppercase font-bold">
        <Skeleton width={200} />
      </h2>
      <hr className="bg-black border-1 border-black" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mt-5">
          <div className="mb-1">
            <Skeleton height={200} />
          </div>
          <div>
            <Skeleton height={15} width={250} />
            <Skeleton height={30} className="mt-3" />
            <Skeleton height={30} />
            <Skeleton height={20} className="mt-3" />
            <Skeleton height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export async function TagSection({ searchTerm }: TagSectionProps) {
  const mostUsedTags = await getMostUsedTags(2);

  let mostUsedTag: string[];
  if (
    mostUsedTags[0] &&
    searchTerm &&
    mostUsedTags[0].toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    mostUsedTag = mostUsedTags[1] ? [mostUsedTags[1]] : [];
  } else {
    mostUsedTag = [mostUsedTags[0]];
  }

  const postsByTags = await getPostsByTags(mostUsedTag, 3);

  return (
    <div className="mt-10">
      <h2 className="text-3xl uppercase">{mostUsedTag}</h2>
      <hr className="bg-black border-1 border-black mb-6" />
      {postsByTags.slice(0, 3).map((post) => (
        <div key={post.id} className="mb-7">
          <PostPreview
            title={
              <h3 className="text-xl hover:text-gray-400">{post.title}</h3>
            }
            coverImage={post.coverImage}
            date={post.createdAt}
            author={post.author}
            excerpt={null}
            slug={post.slug}
            tags={post.tags}
          />
        </div>
      ))}
    </div>
  );
}

export async function PostsCarouselFetcher() {
  const posts = await getRandomPostsFromTwoWeeksAgo(3);

  return <PostCarousel posts={posts} />;
}

export function MiniFooterSkeleton() {
  return (
    <div className="mt-6">
      <div className="flex justify-center gap-4 mt-2 mb-4">
        <div className="flex items-start justify-center space-x-4">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
            <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
              <Skeleton width={40} height={40} />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
            <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
              <Skeleton width={40} height={40} />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
            <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
              <Skeleton width={40} height={40} />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
            <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
              <Skeleton width={40} height={40} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center ml-4">
        <Skeleton width={200} height={20} />
        <Skeleton width={300} height={20} className="mt-2" />
        <Skeleton width={150} height={20} className="mt-2" />
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center my-2">
          <Skeleton width={60} height={60} />
        </div>
        <Skeleton width={100} height={15} className="mt-2" />
      </div>
    </div>
  );
}

export function MiniFooter() {
  return (
    <div className="mt-6">
      <div className="flex justify-center gap-4 mt-2 mb-4">
        <div className="flex items-start justify-center space-x-4">
          {socialMediaLinks.map((socialMedia, index) => (
            <div
              className="relative group"
              key={`social-media-links-footer-${index}`}
            >
              <a href={socialMedia.url} target="_blank">
                <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                  <socialMedia.icon className="text-2xl text-gray-500 transition-color duration-300 group-hover:text-black" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center ml-4">
        <span className="uppercase text-sm">
          Tecnobuc -{" "}
          <span className="text-gray-700">
            Un noticiero digital de tecnología con contenido generado
            automáticamente.
          </span>
        </span>
        <span className="uppercase text-sm text-gray-700">
          Todos los derechos reservados.
        </span>
        <span className="uppercase text-sm text-gray-700">&copy; 2024</span>
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center my-2 ml-2">
          <Image
            src="/icon.png"
            width="50"
            height="50"
            alt="Logotipo de Tecnobuc"
            className="w-14 h-14 object-cover"
          />
        </div>
        <span className="uppercase text-xs">
          Hecho por{" "}
          <a
            href={SITE_AUTHOR_URL}
            className="underline hover:text-blue-600 duration-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_AUTHOR}
          </a>
        </span>
      </div>
    </div>
  );
}

export default function SideSection({ searchTag }: SideSectionProps) {
  return (
    <Fragment>
      <Suspense fallback={<SpecialSectionSkeleton />}>
        <SpecialSection />
      </Suspense>
      <Suspense fallback={<TagSectionSkeleton />}>
        <TagSection searchTerm={searchTag} />
      </Suspense>
      <Suspense fallback={<PostCarouselSkeleton />}>
        <PostsCarouselFetcher />
      </Suspense>
      <hr className="mt-4 w-full" />
      <Suspense fallback={<MiniFooterSkeleton />}>
        <MiniFooter />
      </Suspense>
    </Fragment>
  );
}
