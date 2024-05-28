import { MoreStories } from "@/app/components/more-stories";
import Container from "@/components/container";
import { getAllPosts } from "@/lib/api";

export default function RecordPage({ params }: { params?: { page?: string } }) {
  const page = params?.page ? parseInt(params.page) : 1;
  const allPostsPromise = getAllPosts(page);

  return (
    <main>
      <Container>
        {allPostsPromise.then((allPosts) => {
          const morePosts = allPosts.slice(1);
          return (
            <>{morePosts.length > 0 && <MoreStories posts={morePosts} />}</>
          );
        })}
      </Container>
    </main>
  );
}
