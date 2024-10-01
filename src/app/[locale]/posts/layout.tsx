import { Suspense } from "react";

import { getMostUsedTags } from "@/lib/api";

import NavBar from "../components/navbar";

async function NavBarComponent({ locale }: { locale: string }) {
  const tagsMostUsed = await getMostUsedTags(5, locale);

  // Transform the tags to get only the names
  const tagNames = tagsMostUsed.map((tag) => tag.name);

  return (
    <nav className={"bg-primary shadow-2xl fixed top-0 left-0 right-0 z-50"}>
      <NavBar isNavBar={true} tags={tagNames} />
    </nav>
  );
}

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-16 bg-gray-100 fixed top-0 left-0 right-0 z-50" />
        }
      >
        <NavBarComponent locale={locale} />
      </Suspense>
      <div className="mt-16">{children}</div>
    </div>
  );
}
