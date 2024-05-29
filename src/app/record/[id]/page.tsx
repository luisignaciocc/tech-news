import { MoreStories } from "@/app/components/more-stories";
import PageNavigation from "@/app/components/PageNavigation";
import Container from "@/components/container";
import { getAllPosts } from "@/lib/api";

export default async function RecordPage({
  params,
}: {
  params: { id: string };
}) {
  const pageId = params.id;
  const page = parseInt(pageId);
  const { posts, hasMorePosts } = await getAllPosts(page);
  const morePosts = posts.slice(1);

  return (
    <main>
      <Container>
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        <PageNavigation params={{ id: pageId }} hasMorePosts={hasMorePosts} />
      </Container>
    </main>
  );
}
