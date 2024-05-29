"use client";
import { useRouter } from "next/navigation";

interface PageNavigationProps {
  currentPage: string;
  hasMorePosts: boolean;
}

export default function PageNavigation({
  currentPage,
  hasMorePosts,
}: PageNavigationProps) {
  const page = parseInt(currentPage);
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (currentPage === "") {
      router.push(`/record/2`);
    } else if (newPage > 1) {
      router.push(`/record/${newPage}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        {page > 1 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePageChange(page - 1)}
          >
            Anterior
          </button>
        )}
        {hasMorePosts && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePageChange(page + 1)}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
