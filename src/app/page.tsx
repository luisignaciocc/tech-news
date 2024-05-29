import Container from "@/components/container";
import { getAllPosts } from "@/lib/api";

import { HeroPost } from "./components/hero-post";
import { Intro } from "./components/intro";
import { MoreStories } from "./components/more-stories";
import PageNavigation from "./components/PageNavigation";

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
                <PageNavigation params={{ id: page.toString() }} />
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
