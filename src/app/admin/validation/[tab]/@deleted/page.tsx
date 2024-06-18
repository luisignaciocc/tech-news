import DeletedTable from "./components/deleted-table";

function DeletedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <DeletedTable />
    </div>
  );
}

export default DeletedPage;
