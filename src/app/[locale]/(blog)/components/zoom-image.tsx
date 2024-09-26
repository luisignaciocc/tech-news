import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const ZoomImage = ({ title, src, slug }: Props) => {
  const t = useTranslations("Zoom-image");

  const image = (
    <div
      className={cn("relative overflow-hidden", {
        "transition-all duration-700 hover:grayscale w-full": slug,
        "mx-auto": !slug,
      })}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${t("alt")} ${title}`}
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
