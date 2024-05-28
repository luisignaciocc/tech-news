import { MoreStories } from "@/app/components/more-stories";
import Container from "@/components/container";
import { getAllPosts } from "@/lib/api";

export default async function RecordPage({
  params,
}: {
  params: { id: string };
}) {
  const pageId = params.id;
  const page = parseInt(pageId);
  const allPosts = await getAllPosts(page);
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
