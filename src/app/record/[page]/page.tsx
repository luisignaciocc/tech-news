import { MoreStories } from "@/app/components/more-stories";
import PageNavigation from "@/app/components/PageNavigation";
import Container from "@/components/container";
import { getAllPosts } from "@/lib/api";

export default async function RecordPage({
  params,
}: {
  params: { page: string };
}) {
  const pageId = params.page;
  const page = parseInt(pageId);
  const { posts, hasMorePosts } = await getAllPosts(page);

  return (
    <main>
      <Container>
        {posts.length > 0 && <MoreStories posts={posts} />}
        <PageNavigation params={{ id: pageId }} hasMorePosts={hasMorePosts} />
      </Container>
    </main>
  );
}
