import PostsTable from "./components/deleted-table";
import { getPostsData } from "./utils/prisma";

interface PostsData {
  id: string;
  title: string;
  coverImage: string;
}

async function PostsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const perPage = 10;
  const response = await getPostsData(Number(searchParams?.page), perPage);

  return <PostsTable data={response.data as PostsData[]} />;
}

export default PostsPage;
