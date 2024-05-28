import Link from "next/link";

import Container from "@/components/container";
import { getAllPosts } from "@/lib/api";

import { HeroPost } from "./components/hero-post";
import { Intro } from "./components/intro";
import { MoreStories } from "./components/more-stories";

export default function Index({ params }: { params?: { page?: string } }) {
  const page = params?.page ? parseInt(params.page) : 1;
  const allPostsPromise = getAllPosts(page);

  return (
    <main>
      <Container>
        <Intro />
        {allPostsPromise.then((allPosts) => {
          const heroPost = allPosts[0];
          const morePosts = allPosts.slice(1);
          return (
            <>
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
              <div className="flex justify-end mb-5">
                <Link href={`/record/${page + 1}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Siguiente
                  </button>
                </Link>
              </div>
            </>
          );
        })}
      </Container>
    </main>
  );
}
export async function fetchData({ params }: { params?: { page?: string } }) {
  const page = params?.page ? parseInt(params.page) : 1;
  const allPosts = await getAllPosts(page);
  return {
    posts: allPosts,
  };
}
