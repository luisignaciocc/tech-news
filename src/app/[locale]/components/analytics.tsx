"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

export function Analytics() {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        if (!event.url.endsWith(".com/")) {
          return null;
        }
        return event;
      }}
    />
  );
}
