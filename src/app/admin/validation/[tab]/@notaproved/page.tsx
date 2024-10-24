import PaginationButtons from "../components/pagination-buttons";
import NotAprovedTable from "./components/notaproved-table";
import { getNotAprovedData } from "./utils/prisma";

interface NotAprovedResponse {
  data: NotAproved[];
  hasMorePages: boolean;
}

interface NotAproved {
  id: string;
  title: string;
}

async function NotAprovedPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const perPage = 15;
  let response: NotAprovedResponse = {
    data: [],
    hasMorePages: false,
  };

  response = await getNotAprovedData(Number(searchParams?.page), perPage);

  return (
    <div>
      <NotAprovedTable data={response.data} />
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
        tab={"notaproved"}
      />
    </div>
  );
}

export default NotAprovedPage;
