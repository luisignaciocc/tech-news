import { getPostsCards } from "@/lib/api";

import { PostCard, PostCardLoadingSkeleton } from "./post-card";

export function HeaderPostLoadingSkeleton() {
  return (
    <div className="flex flex-wrap justify-center mx-4 my-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`relative flex items-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 justify-center ${
            index < 1
              ? ""
              : index < 2
                ? "sm:block hidden"
                : index < 3
                  ? "lg:block hidden"
                  : index < 4
                    ? "xl:block hidden"
                    : "hidden"
          }`}
        >
          <PostCardLoadingSkeleton />
        </div>
      ))}
    </div>
  );
}

export default async function HeaderPosts({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const slugsCard = await getPostsCards(slug, 4, locale);

  return (
    <div className="flex flex-wrap justify-center mx-4 my-4">
      {slugsCard.map((post, index) => (
        <div
          key={index}
          className={`relative flex items-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 justify-center ${
            index < 1
              ? ""
              : index < 2
                ? "sm:block hidden"
                : index < 3
                  ? "lg:block hidden"
                  : index < 4
                    ? "xl:block hidden"
                    : "hidden"
          }`}
        >
          <PostCard
            key={index}
            imageUrl={post.coverImage || ""}
            title={post.title}
            tags={post.tags}
            slug={post.slug}
          />
        </div>
      ))}
    </div>
  );
}
