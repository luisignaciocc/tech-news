// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/admin/:path*"],
// };

import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(es|en)/:path*"],
};
