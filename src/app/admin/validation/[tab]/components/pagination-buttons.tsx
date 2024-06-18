import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  page: number;
  hasMorePages: boolean;
  tab: string;
}

export default function PageNavigation({
  page,
  hasMorePages,
  tab,
}: PageNavigationProps) {
  return (
    <div className="flex justify-center space-x-4 mb-5">
      {page > 1 ? (
        <Link href={`/admin/validation/${tab}?page=${page - 1}`}>
          <Button className="flex items-center space-x-2">
            <FaChevronLeft />
            <span>Anterior</span>
          </Button>
        </Link>
      ) : (
        <Button disabled className="flex items-center space-x-2">
          <FaChevronLeft />
          <span>Anterior</span>
        </Button>
      )}
      {hasMorePages ? (
        <Link href={`/admin/validation/${tab}?page=${page + 1}`}>
          <Button className="flex items-center space-x-2">
            <span>Siguiente</span>
            <FaChevronRight />
          </Button>
        </Link>
      ) : (
        <Button disabled className="flex items-center space-x-2">
          <span>Siguiente</span>
          <FaChevronRight />
        </Button>
      )}
    </div>
  );
}
