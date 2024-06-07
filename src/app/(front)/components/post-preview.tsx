import Link from "next/link";

import Avatar from "@/components/avatar";
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
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage || "/api/preview-image"}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter date={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
