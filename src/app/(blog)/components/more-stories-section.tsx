import React from "react";

import { MoreStories } from "../components/more-stories";
import { PostPreview } from "../components/post-preview";
import PostCarousel from "./posts-carousel";
import SecondTagSection from "./second-tag-section";

interface MorePosts {
  title: string;
  coverImage: string | null;
  author: {
    id: string;
    name: string;
    picture: string;
  };
  slug: string;
  excerpt: string | null;
  tags: {
    id: number;
    name: string;
  }[];
  id: string;
  createdAt: Date;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  coverImage: string | null;
  createdAt: Date;
  excerpt: string | null;
  author: {
    id: string;
    name: string;
    picture: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
}

interface PostsByTags {
  id: string;
  title: string;
  coverImage: string | null;
  author: {
    id: string;
    name: string;
    picture: string;
  };
  slug: string;
  excerpt: string | null;
  tags: {
    name: string;
  }[];
  createdAt: Date;
}

interface Props {
  heroPosts?: {
    id: string;
    slug: string;
    title: string;
    coverImage: string | null;
    publishedAt: Date | null;
    tags: { id: number; name: string }[];
  }[];
  morePosts: MorePosts[];
  hasMorePosts?: boolean;
  posts: Post[];
  secondMostUsedTag: string[];
  postsByTags: PostsByTags[];
}

function MoreStoriesSection({
  heroPosts,
  morePosts,
  hasMorePosts,
  posts,
  secondMostUsedTag,
  postsByTags,
}: Props) {
  return (
    <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
      {heroPosts && <PostCarousel posts={heroPosts} />}

      {morePosts.length > 0 ? (
        <MoreStories
          posts={morePosts.slice(0, 6)}
          hasMorePosts={hasMorePosts}
        />
      ) : (
        <div className="bg-gray-900 text-white w-full h-auto py-10 px-12">
          <p className="text-2xl">No hay publicaciones disponibles.</p>
          <p className="mt-5">
            Intenta con otro término de búsqueda, puedes utilizar palabras
            claves o abreviaturas, ejemplo: `ARTIFICIAL` o `IA`.
          </p>
        </div>
      )}

      <SecondTagSection
        secondMostUsedTag={secondMostUsedTag}
        postsByTags={postsByTags}
      />

      {posts.length > 6 && (
        <PostPreview
          key={posts[6].slug}
          title={posts[6].title}
          coverImage={posts[6].coverImage}
          date={posts[6].createdAt}
          author={posts[6].author}
          slug={posts[6].slug}
          excerpt={posts[6].excerpt}
          tags={posts[6].tags}
          titleLinkClassName="hover:underline"
        />
      )}

      {morePosts.length > 0 && (
        <div className="mt-8">
          <MoreStories
            posts={morePosts.slice(7, 11)}
            hasMorePosts={hasMorePosts}
          />
        </div>
      )}
    </div>
  );
}

export default MoreStoriesSection;
