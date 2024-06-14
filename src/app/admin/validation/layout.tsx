import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Administrativo.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Validación</h2>
      </div>
      <Link href={"/admin/validation/topublish?page=2"}>To Publish</Link>
      <Link href={"/admin/validation/deleted?page=2"}>Deleted</Link>
      {children}
    </div>
  );
}
