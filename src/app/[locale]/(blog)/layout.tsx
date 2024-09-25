import Footer from "./components/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="mt-16">{children}</div>
      <Footer />
    </div>
  );
}
