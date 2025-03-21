import Link from "next/link";

import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import { DateFormatter } from "@/components/date-formatter";

type Props = {
  title: string;
  coverImage: string | null;
  date: Date;
  excerpt: string | null;
  author: {
    name: string;
    picture: string;
  };
  slug: string;
  locale: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  locale,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          src={coverImage || "/api/preview-image"}
          slug={slug}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            {locale === "es" ? (
              <DateFormatter date={date} />
            ) : (
              date.toDateString()
            )}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
}
