import DeletedTable from "./components/deleted-table";

function DeletedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <h1>{searchParams?.page}</h1>
      <DeletedTable />
    </div>
  );
}

export default DeletedPage;
