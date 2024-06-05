import Footer from "../components/footer";
import RootLayout from "../layout";

export default function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <div className="min-h-screen">
        {children}
        <Footer />
      </div>
    </RootLayout>
  );
}
