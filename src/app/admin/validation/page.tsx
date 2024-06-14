import { redirect } from "next/navigation";

function ValidationPage() {
  redirect("/admin/validation/topublish?page=1");
}

export default ValidationPage;
