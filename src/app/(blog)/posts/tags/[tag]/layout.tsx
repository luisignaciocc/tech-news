import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Tag | Tecnobuc",
  description: "Buscar Tag.",
};

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    tag: string;
  };
}>) {
  const tag = decodeURIComponent(params.tag);

  metadata.title = `Buscar "${tag}" | Tecnobuc`;
  metadata.description = `Buscar "${tag}"`;

  return <div>{children}</div>;
}
