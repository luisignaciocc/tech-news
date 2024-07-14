import { getMostUsedTags } from "@/lib/api";

import NavBar from "../components/navbar";

async function NavBarComponent() {
  const tagsMostUsed = await getMostUsedTags();

  return <NavBar tags={tagsMostUsed} />;
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBarComponent />
      <div className="mt-16">{children}</div>
    </div>
  );
}
