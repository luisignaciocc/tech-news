import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const ZoomImage = ({ title, src, slug }: Props) => {
  const image = (
    <div
      className={cn("relative overflow-hidden", {
        "transition-all duration-700 hover:grayscale w-full": slug,
        "mx-auto": !slug,
      })}
    >
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn("transition-all duration-1000 hover:scale-105", {
          "mx-auto": !slug,
        })}
        width={820}
        height={630}
      />
    </div>
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

export default ZoomImage;
