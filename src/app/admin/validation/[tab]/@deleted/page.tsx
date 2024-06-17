function DeletedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <h1>DeletedPage {searchParams?.page}</h1>
    </div>
  );
}

export default DeletedPage;
