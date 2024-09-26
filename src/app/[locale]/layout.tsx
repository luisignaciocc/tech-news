import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";

import { Analytics } from "../components/analytics";
import InternacionalizationProvider from "./(blog)/components/internacionalization-provider";

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
        <InternacionalizationProvider>{children}</InternacionalizationProvider>
      </body>
      <GoogleAnalytics gaId="G-0NYZMYCD8C" />
    </html>
  );
}
