import { CheckboxProvider } from "@/app/admin/context/checkbox-context";

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

async function ToPublishPage(
  props: {
    searchParams?: Promise<{ [key: string]: string | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const perPage = 15;
  let response: ToPublishDataResponse = {
    data: [],
    hasMorePages: false,
  };

  response = await getToPublishData(Number(searchParams?.page), perPage);

  return (
    <div>
      <CheckboxProvider>
        <ToPublishTable data={response.data} />
      </CheckboxProvider>
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
        tab={"topublish"}
      />
    </div>
  );
}

export default ToPublishPage;
