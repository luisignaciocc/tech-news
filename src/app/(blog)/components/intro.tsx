import "react-loading-skeleton/dist/skeleton.css";

// import { useTranslations } from "next-intl";
import React from "react";
import Skeleton from "react-loading-skeleton";

import DashboardTagsFetcher from "./dashboard-tags-fetcher";

export function IntroSkeleton() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-6 md:mb-10">
      <div className="w-full mx-12">
        <Skeleton height={65} />
      </div>
    </section>
  );
}

export function Intro() {
  // const t = useTranslations("HomePage");

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-6 md:mb-10">
      {/* <h1>{t("title")}</h1> */}
      <DashboardTagsFetcher />
    </section>
  );
}
