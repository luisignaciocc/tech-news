import { Metadata } from "next";
import { Suspense } from "react";

import { getMostUsedTags } from "@/lib/api";

import NavBar from "../components/navbar";

export const metadata: Metadata = {
  title: "Busqueda de Posts | Tecnobuc",
  description: "Busqueda de Posts.",
};

async function NavBarComponent() {
  const tagsMostUsed = await getMostUsedTags(5);

  return (
    <nav className={"bg-primary shadow-2xl fixed top-0 left-0 right-0 z-50"}>
      <NavBar
        isNavBar={true}
        tags={tagsMostUsed}
        bgLinksColor="text-white"
        hoverLinksColor="hover:text-gray-400"
        socialMediaColor="white"
      />
    </nav>
  );
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-16 bg-gray-100 fixed top-0 left-0 right-0 z-50" />
        }
      >
        <NavBarComponent />
      </Suspense>
      <div className="mt-16">{children}</div>
    </div>
  );
}
