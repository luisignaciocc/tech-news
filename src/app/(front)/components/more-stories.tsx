import Link from "next/link";

import { Post } from "@/lib/api";

import { PostPreview } from "../../components/post-preview";

type Props = {
  posts: Post[];
  hasMorePosts?: boolean;
};

export function MoreStories({ posts, hasMorePosts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Más Noticias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.createdAt}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
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
