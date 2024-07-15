import { Viewport } from "next";

import Container from "@/components/container";
import { getPosts } from "@/lib/api";
import { defaultMetadata } from "@/lib/metadata";
import { PER_PAGE } from "@/lib/utils";

import { HeroPost } from "./components/hero-post";
import { Intro } from "./components/intro";
import { MoreStories } from "./components/more-stories";
import NavbarController from "./components/navbar-controller";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

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
      <NavbarController />
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
        {morePosts.length > 0 && (
          <MoreStories posts={morePosts} hasMorePosts={hasMorePosts} />
        )}
      </Container>
    </main>
  );
}

export const metadata = defaultMetadata;
