import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  page: number;
  hasMorePosts: number;
  tab: string;
}

export default function PageNavigation({
  page,
  hasMorePosts,
  tab,
}: PageNavigationProps) {
  return (
    <div>
      <div className="flex justify-between mb-5">
        {page > 1 && (
          <Link href={`/admin/validation/${tab}?page=${page - 1}`}>
            <Button>Anterior</Button>
          </Link>
        )}
        {hasMorePosts ? (
          <Link href={`/admin/validation/${tab}?page=${page + 1}`}>
            <Button>Siguiente</Button>
          </Link>
        ) : (
          <Button disabled>Siguiente</Button>
        )}
      </div>
    </div>
  );
}
