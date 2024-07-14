import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPostBySlug, getPostSlugs } from "@/lib/api";
import {
  defaultMetadata,
  PERSONAL_HANDLER,
  SITE_DESCRIPTION,
  SITE_HANDLER,
  SITE_SHORT_NAME,
  SITE_URL,
} from "@/lib/metadata";

import HeaderPosts, {
  HeaderPostLoadingSkeleton,
} from "./components/header-posts";
import PostContent, {
  PostContentLoadigSkeleton,
} from "./components/post-content";
import SimilarPosts from "./components/similar-post";

type Params = {
  params: {
    slug: string;
  };
};

export default async function PostPageContent({ params }: Params) {
  return (
    <main>
      <article className="mb-8 relative">
        <Suspense fallback={<HeaderPostLoadingSkeleton />}>
          <HeaderPosts slug={params.slug} />
        </Suspense>
        <div className="w-full h-14 bg-gray-100 mb-8"></div>

        <div className="mx-auto px-4 max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <Suspense fallback={<PostContentLoadigSkeleton />}>
            <PostContent slug={params.slug} />
          </Suspense>
        </div>
        <Suspense>
          <SimilarPosts slug={params.slug} />
        </Suspense>
      </article>
    </main>
  );
}

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
