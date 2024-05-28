import { useSearchParams } from "next/navigation";

export default function RecordPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <h1>Record Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}
