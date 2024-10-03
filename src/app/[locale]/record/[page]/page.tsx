import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

import { MoreStories } from "@/app/[locale]/components/more-stories";
import SideSection from "@/app/[locale]/components/side-section";
import { getPosts } from "@/lib/api";

import PageNavigation from "./components/page-navigation";

export default async function SearchPostContent({
  params,
}: {
  params?: {
    page?: string;
    locale?: string;
  };
}) {
  const page = params?.page ? parseInt(params.page) : 1;
  const perPage = 30;
  const locale = params?.locale || "es";
  const [{ posts, count }] = await Promise.all([
    getPosts({
      page,
      perPage,
      locale,
    }),
  ]);

  const hasMorePosts = page * perPage < count;
  const t = await getTranslations("Record-page");

  return (
    <div className="mt-10 mx-6 xl:mx-auto mb-10 xl:max-w-6xl ">
      <div className="flex items-center">
        <span className="uppercase text-4xl mt-4 flex items-center leading-tight tracking-tighter">
          <span className="hidden md:inline-block mr-2">{t("title")}</span>
        </span>
      </div>
      <div className="flex gap-8 mt-2">
        <div className="w-full lg:w-8/12 mt-6 lg:mt-14">
          {posts.length > 0 ? (
            <MoreStories posts={posts} locale={locale} />
          ) : (
            <div className="bg-gray-900 text-white w-full h-auto py-10 px-12">
              <p className="text-2xl">{t("undefined")}</p>
            </div>
          )}
        </div>
        <div className="w-4/12 hidden lg:block">
          <SideSection locale={locale} />
        </div>
      </div>
      <PageNavigation currentPage={page} hasMorePosts={hasMorePosts} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Record-page");

  const title = `Tecnobuc | ${t("title")}`;
  const description = `${t("description")}.`;

  return {
    title,
    description,
  };
}
