import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  page: number;
  hasMorePages: boolean;
}

export default function PageNavigation({
  page,
  hasMorePages,
}: PageNavigationProps) {
  return (
    <div className="flex justify-center space-x-4 mb-5">
      {page > 1 ? (
        <Link href={`/admin/posts?page=${page - 1}`}>
          <Button className="flex items-center space-x-2">
            <FaChevronLeft />
          </Button>
        </Link>
      ) : (
        <Button disabled className="flex items-center space-x-2">
          <FaChevronLeft />
        </Button>
      )}
      {hasMorePages ? (
        <Link href={`/admin/posts?page=${page + 1}`}>
          <Button className="flex items-center space-x-2">
            <FaChevronRight />
          </Button>
        </Link>
      ) : (
        <Button disabled className="flex items-center space-x-2">
          <FaChevronRight />
        </Button>
      )}
    </div>
  );
}
