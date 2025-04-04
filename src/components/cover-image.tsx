import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-lg w-full", {
        "hover:shadow-xl transition-shadow duration-200": slug,
        "max-w-5xl mx-auto": !slug,
      })}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
