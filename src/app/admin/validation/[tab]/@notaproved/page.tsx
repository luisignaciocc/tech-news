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

async function NotAprovedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const perPage = 15;
  let response: NotAprovedResponse = {
    data: [],
    hasMorePages: false,
  };

  response = await getNotAprovedData(Number(searchParams?.page), perPage);

  return (
    <div>
      <NotAprovedTable data={response.data} />
    </div>
  );
}

export default NotAprovedPage;
