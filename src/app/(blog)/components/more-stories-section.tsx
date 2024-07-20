import React, { Fragment } from "react";

import { MoreStories } from "../components/more-stories";

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

interface Props {
  hasMorePosts?: boolean;
  posts: Post[];
}

function MoreStoriesSection({ hasMorePosts, posts }: Props) {
  return (
    <Fragment>
      {posts.length > 0 ? (
        <MoreStories posts={posts} hasMorePosts={hasMorePosts} />
      ) : (
        <div className="bg-gray-900 text-white w-full h-auto py-10 px-12">
          <p className="text-2xl">No hay publicaciones disponibles.</p>
          <p className="mt-5">
            Intenta con otro término de búsqueda, puedes utilizar palabras
            claves o abreviaturas, ejemplo: `ARTIFICIAL` o `IA`.
          </p>
        </div>
      )}
    </Fragment>
  );
}

export default MoreStoriesSection;
