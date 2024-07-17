import { Viewport } from "next";

import Container from "@/components/container";
import { getPosts } from "@/lib/api";
import { getMostUsedTags, getPostsByTags, getRandomPosts } from "@/lib/api";
import { defaultMetadata } from "@/lib/metadata";
import { PER_PAGE } from "@/lib/utils";

import { Intro } from "./components/intro";
import MiniFooter from "./components/mini-footer";
import MoreStoriesSection from "./components/more-stories-section";
import PostCarousel from "./components/posts-carousel";
import { SpecialSection } from "./components/special-section";
import TagSection from "./components/tag-section";

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

  const heroPost = posts.slice(0, 9).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    coverImage: post.coverImage,
    publishedAt: post.createdAt,
    tags: post.tags,
  }));
  const morePosts = posts.slice(9);
  const postIds = morePosts.map((post) => post.id);
  const hasMorePosts = page * perPage < count;

  const mostUsedTag = await getMostUsedTags(1);

  const [specialPosts, postsByTags, postsForCarousel] = await Promise.all([
    getRandomPosts(postIds, 5),
    getPostsByTags(mostUsedTag, 3),
    getRandomPosts(postIds, 3),
  ]);

  return (
    <main>
      <Container>
        <Intro />
        <div className="w-11/12 mx-auto justify-center">
          <div className="flex gap-8 mt-2">
            <MoreStoriesSection
              heroPosts={heroPost}
              morePosts={morePosts}
              hasMorePosts={hasMorePosts}
              posts={posts}
            />
            <div className="w-4/12 hidden lg:block">
              <SpecialSection specialPosts={specialPosts} />
              <TagSection mostUsedTag={mostUsedTag} postsByTags={postsByTags} />
              <PostCarousel posts={postsForCarousel} />
              <hr className="mt-4 w-full" />
              <MiniFooter />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export const metadata = defaultMetadata;
