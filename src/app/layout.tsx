import "./globals.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { SITE_URL } from "@/lib/metadata";

import { Analytics } from "./components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Tecnobuc | Noticiero de tecnología generado por IA`,
  description: `Un noticiero digital de tecnología con contenido generado automáticamente.`,
  openGraph: {
    images: [{ url: "/api/og?title=Tecnobuc" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-WKN32H7F" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054099836040190"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
      <GoogleAnalytics gaId="G-0NYZMYCD8C" />
    </html>
  );
}
