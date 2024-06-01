import { Metadata } from "next";

export const SITE_SHORT_NAME = `Tecnobuc`;
export const SITE_ONELINER = `Noticiero de tecnología generado por IA`;
export const SITE_NAME = `${SITE_SHORT_NAME} | ${SITE_ONELINER}`;
export const SITE_DESCRIPTION = `Un noticiero digital de tecnología con contenido generado automáticamente.`;
export const SITE_AUTHOR = `Bocono Labs`;
export const SITE_AUTHOR_URL = `https://bocono-labs.com`;
export const SITE_HANDLER = `@tecnobuc`;
export const PERSONAL_HANDLER = `@luisignaciocc`;
export const SITE_URL =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : `https://www.tecnobuc.com`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : // : `http://localhost:3000`;
        `https://www.tecnobuc.com`;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: {
    url: SITE_AUTHOR_URL,
    name: SITE_AUTHOR,
  },
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  generator: "Next.js",
  keywords: ["tecnología", "noticias", "IA", "inteligencia artificial"],
  referrer: "origin",
  robots: "index, follow",
  alternates: { canonical: SITE_URL },
  icons: {
    icon: `${SITE_URL}/icon.png`,
    apple: `${SITE_URL}/apple-icon.png`,
  },
  manifest: `${SITE_URL}/manifest.json`,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_SHORT_NAME,
    images: [
      {
        url: `${SITE_URL}/og.png`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    site: SITE_HANDLER,
    creator: PERSONAL_HANDLER,
    images: `${SITE_URL}/og.png`,
  },
  verification: undefined,
  appleWebApp: {
    capable: true,
    title: SITE_SHORT_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  itunes: null,
  abstract: null,
  appLinks: null,
  archives: `${SITE_URL}/record/2`,
  assets: null,
  bookmarks: null,
  category: "Tecnología",
  classification: "Noticias de Tecnología",
};
