import { getToPublishData } from "../@topublish/utils/prisma";
import PaginationButtons from "../components/pagination-buttons";
import DefaultTable from "../components/table";

interface ToPublishDataResponse {
  data: ToPublishData[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

interface ToPublishData {
  id: string;
  title: string;
}

async function ToPublishPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  let response: ToPublishDataResponse = {
    data: [],
    totalCount: 0,
    currentPage: 0,
    totalPages: 0,
  };

  response = await getToPublishData(Number(searchParams?.page), 2);

  return (
    <div>
      <DefaultTable data={response.data} />
      <PaginationButtons
        page={response.currentPage}
        hasMorePosts={1}
        tab={"topublish"}
      />
    </div>
  );
}

export default ToPublishPage;
