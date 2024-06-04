import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  currentPage: string;
  hasMorePosts: boolean;
}

export default function PageNavigation({
  currentPage,
  hasMorePosts,
}: PageNavigationProps) {
  const page = parseInt(currentPage);

  return (
    <div>
      <div className="flex justify-between mb-5">
        {page > 1 && (
          <Link href={page > 2 ? `/record/${page - 1}` : "/"}>
            <Button>Anterior</Button>
          </Link>
        )}
        <Link href="/">
          <Button>Inicio</Button>
        </Link>
        {hasMorePosts ? (
          <Link href={`/record/${page + 1}`}>
            <Button>Siguiente</Button>
          </Link>
        ) : (
          <Button disabled>Siguiente</Button>
        )}
      </div>
    </div>
  );
}
