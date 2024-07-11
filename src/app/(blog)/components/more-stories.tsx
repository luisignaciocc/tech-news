import Link from "next/link";

import { PostPreview } from "./post-preview";

type Props = {
  posts: {
    slug: string;
    title: string;
    coverImage: string | null;
    createdAt: Date;
    excerpt: string | null;
    author: {
      name: string;
      picture: string;
    };
    tags: {
      name: string;
    }[];
  }[];
  hasMorePosts?: boolean;
};

export function MoreStories({ posts, hasMorePosts }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-6 gap-y-20 md:gap-y-8 mb-8">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.createdAt}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
        {hasMorePosts && (
          <Link href="/record/2">
            <div className="h-full flex items-center justify-center group ">
              <div className="mx-3 bg-primary border border-primary text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 group-hover:bg-white group-hover:text-black">
                Ver posts mas antiguos
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
