import { Metadata } from "next";
import { notFound } from "next/navigation";

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { getPostBySlug, getPostSlugs } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

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
            date={post.date}
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

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
}
