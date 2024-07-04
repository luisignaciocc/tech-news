import Link from "next/link";

interface Tag {
  id: number;
  name: string;
}

interface MoreTagsProps {
  tags: Tag[];
}

const MoreTags: React.FC<MoreTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {tags.map((tag) => (
        <Link
          href={`/posts/tags/${tag.name}`}
          key={tag.id}
          className="bg-white text-gray-400 border border-gray-400 px-3 py-1 rounded-full hover:border-red-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
        >
          <span>{tag.name.toUpperCase()}</span>
        </Link>
      ))}
    </div>
  );
};

export default MoreTags;
