import Link from "next/link";

import Container from "@/components/container";
import { getPosts } from "@/lib/api";
import { PER_PAGE } from "@/lib/utils";

import { HeroPost } from "./components/hero-post";
import { Intro } from "./components/intro";
import { MoreStories } from "./components/more-stories";

export default async function Index({
  params,
}: {
  params?: { page?: string };
}) {
  const page = params?.page ? parseInt(params.page) : 1;
  const perPage = PER_PAGE;
  const { posts, count } = await getPosts({ page, perPage });

  const heroPost = posts[0];
  const morePosts = posts.slice(1);
  const hasMorePosts = page * perPage < count;

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.createdAt}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        {hasMorePosts && (
          <div className="flex justify-end mb-5">
            <Link
              href="/record/2"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Siguiente
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
