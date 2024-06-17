import { getToPublishData } from "../@topublish/utils/prisma";
import PaginationButtons from "../components/pagination-buttons";
import DefaultTable from "../components/table";

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

  response = await getToPublishData(Number(searchParams?.page), 2);

  return (
    <div>
      <DefaultTable data={response.data} />
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
        tab={"topublish"}
      />
    </div>
  );
}

export default ToPublishPage;
