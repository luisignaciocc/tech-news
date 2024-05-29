import { MoreStories } from "@/app/components/more-stories";
import PageNavigation from "@/app/components/PageNavigation";
import Container from "@/components/container";
import { getPosts, getPostSlugs } from "@/lib/api";
import { PER_PAGE } from "@/lib/utils";

export default async function RecordPage({
  params,
}: {
  params: { page: string };
}) {
  const currentPage = params.page;
  const page = parseInt(currentPage);
  const perPage = PER_PAGE;
  const { posts, count } = await getPosts({ page, perPage });
  const hasMorePosts = page * perPage < count;

  return (
    <main>
      <Container>
        {posts.length > 0 && <MoreStories posts={posts} />}
        <PageNavigation currentPage={currentPage} hasMorePosts={hasMorePosts} />
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
}
