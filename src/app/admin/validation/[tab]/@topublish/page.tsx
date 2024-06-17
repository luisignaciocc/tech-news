import { getToPublishData } from "../@topublish/utils/prisma";
import PaginationButtons from "../components/pagination-buttons";
import ToPublishTable from "./components/topublish-table";

interface ToPublishDataResponse {
  data: ToPublishData[];
  hasMorePages: boolean;
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
    hasMorePages: false,
  };

  await new Promise((resolve) => setTimeout(resolve, 5000));

  response = await getToPublishData(Number(searchParams?.page), 5);

  return (
    <div>
      <ToPublishTable data={response.data} />
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
        tab={"topublish"}
      />
    </div>
  );
}

export default ToPublishPage;
