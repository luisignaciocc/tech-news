import Footer from "./components/footer";

export default function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
