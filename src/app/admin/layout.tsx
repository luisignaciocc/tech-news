import NavBar from "./components/nav-bar";

export default function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col md:flex">
      <NavBar />
      {children}
    </div>
  );
}
