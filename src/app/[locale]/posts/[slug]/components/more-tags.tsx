import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

import { Link } from "@/i18n/routing";

interface Tag {
  id: number;
  nameEs: string;
  nameEn: string;
}

interface MoreTagsProps {
  tags: Tag[];
}

export function MoreTagsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      <Skeleton className="" width={150} height={30} />
      <Skeleton className="" width={200} height={30} />
      <Skeleton className="" width={180} height={30} />
    </div>
  );
}

const MoreTags: React.FC<MoreTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          href={`/posts/tags/${tag.nameEs}`}
          key={tag.id}
          className="bg-white text-sm text-gray-400 border border-gray-400 px-4 py-0.5 rounded-full hover:border-red-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
        >
          <span>{tag.nameEs.toLowerCase()}</span>
        </Link>
      ))}
    </div>
  );
};

export default MoreTags;
