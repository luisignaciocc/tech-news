"use client";
import { useRouter } from "next/navigation";

export function PageNavigation({ currentPage }: { currentPage: number }) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/${page > 1 ? page : ""}`);
  };

  return (
    <div>
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Anterior
        </button>
      )}
      <button onClick={() => handlePageChange(currentPage + 1)}>
        Siguiente
      </button>
    </div>
  );
}
