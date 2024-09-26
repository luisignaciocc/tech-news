import { CheckboxProvider } from "@/app/admin/context/checkbox-context";

import PaginationButtons from "../components/pagination-buttons";
import DeletedTable from "./components/deleted-table";
import { getDeletedData } from "./utils/prisma";

interface DeletedData {
  id: string;
  title: string;
  deletionReason: string;
}

async function DeletedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const perPage = 10;
  const response = await getDeletedData(Number(searchParams?.page), perPage);

  return (
    <div>
      <CheckboxProvider>
        <DeletedTable data={response.data as DeletedData[]} />
      </CheckboxProvider>
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
        tab={"deleted"}
      />
    </div>
  );
}

export default DeletedPage;
