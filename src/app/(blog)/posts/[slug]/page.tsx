import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getPostBySlug,
  getPostsCards,
  getPostSlugs,
  getRelatedPostFromPost,
} from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import {
  defaultMetadata,
  PERSONAL_HANDLER,
  SITE_DESCRIPTION,
  SITE_HANDLER,
  SITE_SHORT_NAME,
  SITE_URL,
} from "@/lib/metadata";

import NewsCard from "./components/news-card";
import { PostBody } from "./components/post-body";
import { PostHeader } from "./components/post-header";
import SimilarPosts from "./components/similiar-post";

export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  const slugsCard = await getPostsCards(post?.id || "", 4);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  const similarPosts = await getRelatedPostFromPost(post.id);

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-6 mb-7">
        {slugsCard.map((post, index) => (
          <div
            key={index}
            className="relative flex items-center max-w-[280px] mt-12 mr-5"
          >
            <NewsCard
              key={index}
              imageUrl={post.coverImage || ""}
              title={post.title}
              tags={post.tags}
              slug={post.slug}
            />
            {index < 3 && (
              <div className="absolute right-[-5px] bottom-1 h-24 border-r border-gray-300" />
            )}
          </div>
        ))}
      </div>
      <article className="mb-32">
        <div className="w-full h-[60px] bg-gray-100 mb-8"></div>
        <div className="w-[90%] h-full flex flex-col items-Start justify-Start mx-auto md:w-[60%]">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.createdAt}
            tags={post.tags}
            excerpt={post.excerpt}
          />
          <PostBody content={content} />
          {similarPosts &&
            similarPosts.map((post, index) => (
              <SimilarPosts
                key={index}
                imageUrl={post.coverImage || ""}
                title={post.title}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
        </div>
      </article>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Tecnobuc`;
  const description = post.excerpt || SITE_DESCRIPTION;

  return {
    ...defaultMetadata,
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: post.tags.map((tag) => tag.name),
    creator: post.author.name,
    publisher: post.author.name,
    openGraph: {
      type: "website",
      url: new URL(`${SITE_URL}/posts/${params.slug}`),
      title,
      description,
      siteName: SITE_SHORT_NAME,
      images: [
        { url: `/posts/${params.slug}/og.png`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      title,
      card: "summary_large_image",
      description,
      site: SITE_HANDLER,
      creator: PERSONAL_HANDLER,
      images: [
        { url: `/posts/${params.slug}/og.png`, width: 1200, height: 630 },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs({ limit: 100 });

  return slugs.map(({ slug }) => ({
    slug,
  }));
}
