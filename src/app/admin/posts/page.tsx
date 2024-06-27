import { Fragment } from "react";

import PostsTable from "./components/deleted-table";
import PaginationButtons from "./components/pagination-buttons";
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

  return (
    <Fragment>
      <PostsTable data={response.data as PostsData[]} />
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
        tab={"deleted"}
      />
    </Fragment>
  );
}

export default PostsPage;
