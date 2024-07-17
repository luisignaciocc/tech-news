import { Viewport } from "next";
import Link from "next/link";

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
import { socialMediaLinks } from "./posts/[slug]/components/social-media-buttons";

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
  const postIds = posts.map((post) => post.id);
  const hasMorePosts = page * perPage < count;

  const mostUsedTag = await getMostUsedTags(1);

  const [postsForHeadline, specialPosts, postsByTags, postsForCarousel] =
    await Promise.all([
      getRandomPosts(postIds, 4),
      getRandomPosts(postIds, 5),
      getPostsByTags(mostUsedTag, 3),
      getRandomPosts(postIds, 3),
    ]);

  return (
    <main>
      <Container>
        <Intro />
        <div className="flex flex-wrap justify-center mx-5 md:mx-8 xl:mx-14 mb-5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`relative flex items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 justify-center ${
                index < 1
                  ? ""
                  : index < 2
                    ? "sm:block hidden"
                    : index < 3
                      ? "md:block hidden"
                      : index < 4
                        ? "lg:block hidden"
                        : index < 5
                          ? "xl:block hidden"
                          : "hidden"
              }`}
            >
              {index < postsForHeadline.length ? (
                postsForHeadline[index].title
              ) : (
                <div className="flex justify-center gap-4 mt-2 mb-4">
                  <div className="flex items-start justify-center space-x-2">
                    {socialMediaLinks.map((socialMedia, index) => (
                      <div
                        className="relative group"
                        key={`social-media-links-footer-${index}`}
                      >
                        <Link href={socialMedia.url} target="_blank">
                          <div className="absolute inset-0 border border-gray-500 rounded-full scale-100 transition-transform duration-300 group-hover:scale-125 group-hover:opacity-0 group-hover:duration-500"></div>
                          <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-125">
                            <socialMedia.icon className="text-1xl text-gray-500 transition-color duration-300 group-hover:text-black" />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
