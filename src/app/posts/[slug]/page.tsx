import { Metadata } from "next";
import { notFound } from "next/navigation";

import Container from "@/components/container";
import { getPostBySlug, getPostSlugs } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

import Header from "./components/header";
import { PostBody } from "./components/post-body";
import { PostHeader } from "./components/post-header";

export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.createdAt}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
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

  const title = `${post.title}`;
  const description = post.excerpt;
  const urlEncodedTitle = encodeURIComponent(title);

  return {
    metadataBase: new URL("https://news.bocono-labs.com"),
    title,
    description,
    openGraph: {
      title,
      images: [{ url: post.coverImage || "/api/og?title=" + urlEncodedTitle }],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
}
