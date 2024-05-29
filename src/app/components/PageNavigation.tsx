import Link from "next/link";
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Anterior
            </button>
          </Link>
        )}
        {hasMorePosts && (
          <Link href={`/record/${page + 1}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Siguiente
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
