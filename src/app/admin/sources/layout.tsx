import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sources",
  description: "Sources Registrados.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Sources Registrados
        </h2>
      </div>
      {children}
    </div>
  );
}
