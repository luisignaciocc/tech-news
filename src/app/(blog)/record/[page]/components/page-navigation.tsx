import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  currentPage: number;
  hasMorePosts: boolean;
}

export default function PageNavigation({
  currentPage,
  hasMorePosts,
}: PageNavigationProps) {
  const page = currentPage;

  return (
    <div>
      <div className="flex justify-between mb-5">
        {page > 1 && (
          <Link href={page > 2 ? `/record/${page - 1}` : "/"}>
            <Button>Volver</Button>
          </Link>
        )}
        {hasMorePosts ? (
          <Link href={`/record/${page + 1}`}>
            <Button>Más antiguos</Button>
          </Link>
        ) : (
          <Button disabled>Más antiguos</Button>
        )}
      </div>
    </div>
  );
}
