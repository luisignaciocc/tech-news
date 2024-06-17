import DefaultTable from "../components/table";

function DeletedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <h1>DeletedPage</h1>
      <DefaultTable tab={"deleted"} page={Number(searchParams?.page)} />
    </div>
  );
}

export default DeletedPage;
