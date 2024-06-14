"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function Layout({
  children,
  topublish,
  deleted,
}: Readonly<{
  children: React.ReactNode;
  topublish: React.ReactNode;
  deleted: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const pathParts = pathname.split("/");
  const lastPathPart = pathParts[pathParts.length - 1];

  return (
    <div>
      <p>Página actual: {page}</p>

      {lastPathPart === "topublish"
        ? topublish
        : lastPathPart === "deleted"
          ? deleted
          : children}
    </div>
  );
}
