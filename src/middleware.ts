import { NextResponse } from "next/server";
import { default as nextAuthMiddleware } from "next-auth/middleware";
import { NextRequestWithAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default async function middleware(req: NextRequestWithAuth) {
  const path = req.nextUrl.pathname;

  if (path.includes(".php")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (path.startsWith("/admin")) {
    return nextAuthMiddleware(req);
  } else {
    return createMiddleware(routing)(req);
  }
}

export const config = {
  matcher: ["/", "/(es|en)/:path*", "/admin/:path*"],
};
