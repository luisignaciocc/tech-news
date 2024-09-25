import "../globals.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { SITE_URL } from "@/lib/metadata";

import { Analytics } from "../components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Tecnobuc | Noticiero de tecnología generado por IA`,
  description: `Un noticiero digital de tecnología con contenido generado automáticamente.`,
  openGraph: {
    images: [{ url: "/api/og?title=Tecnobuc" }],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <GoogleTagManager gtmId="GTM-WKN32H7F" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-0NYZMYCD8C" />
    </html>
  );
}
