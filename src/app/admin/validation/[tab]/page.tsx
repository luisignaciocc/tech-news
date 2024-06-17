import { redirect } from "next/navigation";

function TabPage() {
  redirect("/admin/validation/topublish?page=1");
}

export default TabPage;
