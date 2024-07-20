import { notFound } from "next/navigation";

import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

import MoreTags, { MoreTagsSkeleton } from "./more-tags";
import { PostBody, PostBodySkeleton } from "./post-body";
import { PostHeader, PostHeaderSkeleton } from "./post-header";

const PostContent: React.FC<{
  slug: string;
}> = async ({ slug }) => {
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div className="w-full flex flex-col mx-auto">
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.createdAt}
        tags={post.tags}
        excerpt={post.excerpt}
      />
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-4">
          <PostBody content={content} />
        </div>
        <div className="hidden lg:col-span-1"></div>
      </div>
      <MoreTags tags={post.tags} />
    </div>
  );
};

export default PostContent;

export const PostContentLoadigSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col mx-auto">
      <PostHeaderSkeleton />
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-4">
          <PostBodySkeleton />
        </div>
        <div className="hidden lg:col-span-1"></div>
      </div>
      <MoreTagsSkeleton />
    </div>
  );
};
