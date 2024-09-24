import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import { DateFormatter } from "@/components/date-formatter";
import { getRelatedPostFromPostSlug } from "@/lib/api";

interface SimilarPostsProps {
  imageUrl: string | null;
  title: string;
  tags: { id: number; name: string }[];
  slug: string;
  publishedAt: Date | null;
}

export function SimilarPostsSkeleton() {
  return (
    <Fragment>
      {/* Version for large screens */}
      <div className="bg-gray-100 p-4 w-full hidden sm:flex sm:w-3/4 items-start">
        <div className="w-1/3">
          <Skeleton height={100} />
        </div>
        <div className="w-2/3 p-2 flex flex-col justify-between">
          <Skeleton width={110} />
          <div>
            <Skeleton count={2} />
          </div>
          <div className="flex justify-between items-end mt-5">
            <div className="text-gray-700 text-xs line-clamp-2 w-1/2">
              <Skeleton />
            </div>
            <div className="text-gray-600 text-xs line-clamp-1 w-2/5 text-left">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>

      {/* Version for small screens */}
      <div className="bg-white p-4 w-full sm:hidden flex flex-col items-start">
        <hr className="mb-6 w-full border-black" />
        <div className="w-full mb-4">
          <Skeleton height={150} />
        </div>
        <div className="w-full flex flex-col justify-between">
          <Skeleton width={110} />

          <div>
            <Skeleton count={2} />
          </div>
          <div className="flex flex-col justify-between items-start mt-4">
            <div className="text-gray-700 text-xs line-clamp-2 w-1/2">
              <Skeleton />
            </div>
            <div className="text-gray-600 text-xs line-clamp-1 w-1/2 mt-2">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export const SimilarPostsCard: React.FC<SimilarPostsProps> = async ({
  imageUrl,
  title,
  tags,
  slug,
  publishedAt,
}) => {
  const t = useTranslations("Similiar-post");

  return (
    <Fragment>
      {/* Version for large screens */}
      <div className="bg-gray-100 p-4 w-full hidden sm:flex items-start">
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
        <div className="w-2/3 p-2 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold mb-2 uppercase text-gray-400">
              {t("related")}
            </p>
            <h3 className="text-base font-bold mb-1 line-clamp-3">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h3>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-gray-700 text-xs line-clamp-2 w-1/2">
              {tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <Link href={`/posts/tags/${tag.name}`}>
                    <span>{tag.name.toUpperCase()}</span>
                  </Link>
                  {index < tags.length - 1 && ", "}
                </React.Fragment>
              ))}
            </div>
            {publishedAt && (
              <div className="text-gray-600 text-xs line-clamp-1 w-1/2 text-left">
                <span className="mr-2">|</span>{" "}
                <DateFormatter date={publishedAt} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Version for small screens */}
      <div className="bg-white p-4 w-full sm:hidden flex flex-col">
        <hr className="mb-6 w-full border-black" />
        <div className="w-full mb-4">
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
        <div className="w-full flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold mb-2 uppercase text-gray-400">
              Relacionado
            </p>
            <h3 className="text-base font-bold mb-1 line-clamp-3">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h3>
          </div>
          <div className="flex flex-col justify-between items-end mt-4">
            <div className="text-gray-700 text-xs line-clamp-2 w-full">
              {tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <Link href={`/posts/tags/${tag.name}`}>
                    <span>{tag.name.toUpperCase()}</span>
                  </Link>
                  {index < tags.length - 1 && ", "}
                </React.Fragment>
              ))}
            </div>
            {publishedAt && (
              <div className="text-gray-600 text-xs line-clamp-1 w-full mt-2">
                <span className="mr-2">|</span>{" "}
                <DateFormatter date={publishedAt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default async function SimilarPosts({ slug }: { slug: string }) {
  const similarPosts = await getRelatedPostFromPostSlug(slug);
  return (
    <div className="mx-auto px-4 max-w-2xl lg:max-w-4xl xl:max-w-5xl mt-4">
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-4">
          {similarPosts?.map((post, index) => (
            <SimilarPostsCard
              key={index}
              imageUrl={post.coverImage || ""}
              title={post.title}
              tags={post.tags}
              slug={post.slug}
              publishedAt={post.publishedAt}
            />
          ))}
        </div>
        <div className="hidden lg:col-span-1"></div>
      </div>
    </div>
  );
}
