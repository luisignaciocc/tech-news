import { default as nextAuthMiddleware } from "next-auth/middleware";
import { NextRequestWithAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default async function middleware(req: NextRequestWithAuth) {
  // Calls the next-auth middleware
  await nextAuthMiddleware(req);

  // Calls the next-intl middleware
  return createMiddleware(routing)(req);
}

export const config = {
  // Combines the matchers
  matcher: ["/", "/(es|en)/:path*", "/admin/:path*"],
};
