import { Suspense } from "react";

import { getMostUsedTags } from "@/lib/api";

import NavBar from "../components/navbar";

async function NavBarComponent() {
  const tagsMostUsed = await getMostUsedTags(6);

  return <NavBar tags={tagsMostUsed} />;
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
