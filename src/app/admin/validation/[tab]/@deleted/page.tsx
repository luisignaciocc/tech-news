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
  const response = await getDeletedData(Number(searchParams?.page), 5);

  return (
    <div>
      <DeletedTable data={response.data as DeletedData[]} />
      <PaginationButtons
        page={Number(searchParams?.page)}
        hasMorePages={response.hasMorePages}
        tab={"deleted"}
      />
    </div>
  );
}

export default DeletedPage;
