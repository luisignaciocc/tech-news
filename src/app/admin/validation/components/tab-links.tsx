"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabLinks() {
  const pathname = usePathname();

  const pathParts = pathname.split("/");

  const lastPathPart = pathParts[pathParts.length - 1];

  return (
    <div className="flex space-x-4">
      <Link
        href={`/admin/validation/topublish?page=1`}
        className={`bg-primary hover:bg-white hover:text-black border border-black font-bold py-2 px-6 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 ${
          lastPathPart === "topublish" ? "bg-white text-black" : "text-white"
        }`}
      >
        To Publish
      </Link>
      <Link
        href={`/admin/validation/deleted?page=1`}
        className={`bg-primary hover:bg-white hover:text-black border border-black font-bold py-2 px-6 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 ${
          lastPathPart === "deleted" ? "bg-white text-black" : "text-white"
        }`}
      >
        Deleted
      </Link>
    </div>
  );
}
