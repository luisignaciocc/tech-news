import { getMostUsedTags } from "@/lib/api";

import Footer from "./components/footer";
import NavBar from "./components/navbar";

export default async function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tagsMostUsed = await getMostUsedTags();

  return (
    <div className="min-h-screen">
      <NavBar tags={tagsMostUsed} />
      {children}
      <Footer />
    </div>
  );
}
