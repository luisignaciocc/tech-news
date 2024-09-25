import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  currentPage: number;
  hasMorePosts: boolean;
  locale: string;
}

export default function PageNavigation({
  currentPage,
  hasMorePosts,
  locale,
}: PageNavigationProps) {
  const page = currentPage;
  const t = useTranslations("Page-navigation");

  return (
    <div>
      <div className="flex justify-between mb-5">
        {page > 1 && (
          <Link href={page > 2 ? `${locale}/record/${page - 1}` : "/"}>
            <Button>{t("prev-button")}</Button>
          </Link>
        )}
        {hasMorePosts ? (
          <Link href={`${locale}/record/${page + 1}`}>
            <Button>{t("next-button")}</Button>
          </Link>
        ) : (
          <Button disabled>{t("next-button")}</Button>
        )}
      </div>
    </div>
  );
}
