import { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import { routing } from "@/i18n/routing";
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

interface ExtendedMetadata extends Metadata {
  "html:lang"?: string;
}

type Params = {
  params: {
    slug: string;
    locale: string;
  };
};

export default async function PostPageContent({ params }: Params) {
  unstable_setRequestLocale(params.locale);

  return (
    <main>
      <article className="mb-8 relative">
        <Suspense fallback={<HeaderPostLoadingSkeleton />}>
          <HeaderPosts slug={params.slug} locale={params.locale} />
        </Suspense>
        <div className="w-full h-14 bg-gray-100 mb-8"></div>

        <div className="mx-auto px-4 max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <Suspense fallback={<PostContentLoadigSkeleton />}>
            <PostContent slug={params.slug} locale={params.locale} />
          </Suspense>
        </div>
        <Suspense>
          <SimilarPosts slug={params.slug} locale={params.locale} />
        </Suspense>
      </article>
    </main>
  );
}

export async function generateMetadata({
  params,
}: Params): Promise<ExtendedMetadata> {
  const post = await getPostBySlug(params.slug, params.locale);

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
    alternates: { canonical: new URL(`${SITE_URL}/posts/${params.slug}`) },
    openGraph: {
      type: "website",
      url: new URL(`${SITE_URL}/posts/${params.slug}`),
      title,
      description,
      siteName: SITE_SHORT_NAME,
      images: [
        {
          url: new URL(`${SITE_URL}/posts/${params.slug}/og.png`),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title,
      card: "summary_large_image",
      description,
      site: SITE_HANDLER,
      creator: PERSONAL_HANDLER,
      images: [
        {
          url: new URL(`${SITE_URL}/posts/${params.slug}/og.png`),
          width: 1200,
          height: 630,
        },
      ],
    },
    "html:lang": params.locale,
  };
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs({ limit: 100 });

  // Generar las combinaciones de slugs y locales
  const staticParams = [];

  // Crear combinaciones de slugs y locales
  for (const slug of slugs) {
    for (const locale of routing.locales) {
      staticParams.push({ slug: slug.slug, locale });
    }
  }

  return staticParams;
}
