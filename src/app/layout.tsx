import "./globals.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/app/_components/footer";

import { Analytics } from "./_components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `NotiTec | Noticiero de tecnología generado por IA`,
  description: `Un noticiero digital de tecnología con contenido generado automáticamente.`,
  openGraph: {
    images: ["/api/og?title=NotiTec"],
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-0NYZMYCD8C" />
    </html>
  );
}
