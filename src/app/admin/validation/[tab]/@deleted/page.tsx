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
  const response = await getDeletedData();

  return (
    <div>
      <h1>{searchParams?.page}</h1>
      <DeletedTable data={response as DeletedData[]} />
    </div>
  );
}

export default DeletedPage;
