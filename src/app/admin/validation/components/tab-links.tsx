"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function TabLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const pathParts = pathname.split("/");

  const lastPathPart = pathParts[pathParts.length - 1];

  return (
    <div className="flex space-x-4">
      <Link
        href={`/admin/validation/topublish?page=${page || 1}`}
        className={`mx-3 bg-primary hover:bg-white hover:text-black border border-black text-white font-bold py-2 px-6 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 ${
          lastPathPart === "topublish" ? "bg-white text-black" : ""
        }`}
      >
        To Publish
      </Link>
      <Link
        href={`/admin/validation/deleted?page=${page || 1}`}
        className={`mx-3 bg-primary hover:bg-white hover:text-black border border-black text-white font-bold py-2 px-6 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 ${
          lastPathPart === "deleted" ? "bg-white text-black" : ""
        }`}
      >
        Deleted
      </Link>
    </div>
  );
}
