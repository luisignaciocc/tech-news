import { Fragment } from "react";

import { CheckboxProvider } from "../context/checkbox-context";
import PaginationButtons from "./components/pagination-buttons";
import PostsTable from "./components/posts-table";
import { getPostsData } from "./utils/prisma";

interface PostsData {
  id: string;
  title: string;
  coverImage: string;
  newId: string;
}

async function PostsPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const perPage = 10;
  const response = await getPostsData(Number(searchParams?.page), perPage);

  return (
    <Fragment>
      <CheckboxProvider>
        <PostsTable data={response.data as PostsData[]} />
      </CheckboxProvider>
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
      />
    </Fragment>
  );
}

export default PostsPage;
