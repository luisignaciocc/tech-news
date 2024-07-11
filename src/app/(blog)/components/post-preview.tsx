import Link from "next/link";

import CoverImage from "@/components/cover-image";
import { DateFormatter } from "@/components/date-formatter";

type Props = {
  title: string;
  coverImage?: string | null;
  date: Date;
  excerpt?: string | null;
  author: {
    name: string;
    picture: string;
  };
  slug: string;
  tags: {
    name: string;
  }[];
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  tags,
}: Props) {
  return (
    <div>
      <div className="mb-4">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage || "/api/preview-image"}
        />
      </div>
      <div className="text-sm flex items-center">
        {tags.slice(0, 1).map((tag) => (
          <div key={tag.name} className="uppercase text-gray-800 mr-2">
            {tag.name}
          </div>
        ))}
        <span className="mr-2 border-r border border-black h-3"></span>
        <div className="text-gray-500">
          <DateFormatter date={date} />
        </div>
      </div>
      <h3 className="text-2xl leading-tight tracking-tighter">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="text-lg leading-tight tracking-tighter text-gray-500 mt-2 line-clamp-3">
        {excerpt}
      </p>
    </div>
  );
}
