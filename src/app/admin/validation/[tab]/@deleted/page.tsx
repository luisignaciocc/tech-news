import DefaultTable from "../components/table";

function DeletedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <h1>DeletedPage {searchParams?.page}</h1>
      <DefaultTable />
    </div>
  );
}

export default DeletedPage;
