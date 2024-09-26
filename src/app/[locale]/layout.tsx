import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { Analytics } from "./components/analytics";
import Footer from "./components/footer";
import InternacionalizationProvider from "./components/internacionalization-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <head>
        <GoogleTagManager gtmId="GTM-WKN32H7F" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <InternacionalizationProvider>
          <div>
            <div className="mt-16">{children}</div>
            <Suspense>
              <Footer />
            </Suspense>
          </div>
        </InternacionalizationProvider>
      </body>
      <GoogleAnalytics gaId="G-0NYZMYCD8C" />
    </html>
  );
}
