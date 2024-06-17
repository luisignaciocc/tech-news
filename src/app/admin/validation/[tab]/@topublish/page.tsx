import DefaultTable from "../components/table";

async function ToPublishPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <DefaultTable tab={"topublish"} page={Number(searchParams?.page)} />
    </div>
  );
}

export default ToPublishPage;
