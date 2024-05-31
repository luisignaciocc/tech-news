import { MoreStories } from "@/app/components/more-stories";
import PageNavigation from "@/app/components/PageNavigation";
import Container from "@/components/container";
import { getPosts, getPostSlugs } from "@/lib/api";
import {
  defaultMetadata,
  SITE_DESCRIPTION,
  SITE_SHORT_NAME,
} from "@/lib/metadata";
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

  const pages = Math.ceil(slugs.length / PER_PAGE) - 1; // -1 because the first page is handled by the index page

  return Array.from({ length: pages }).map((_, index) => ({
    params: { page: (index + 2).toString() },
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}) {
  const currentPage = params.page;
  return {
    ...defaultMetadata,
    title: `${SITE_SHORT_NAME} | Página ${currentPage}`,
    description: `Archivo | ${SITE_DESCRIPTION}`,
  };
}
