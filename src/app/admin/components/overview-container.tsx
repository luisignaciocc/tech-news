"use server";

import { Suspense } from "react";

import { Overview, OverviewSkeleton } from "./overview";
import { getPostDate } from "./post-date";

export async function OverviewContainer() {
  const data = await getPostDate();

  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <Overview data={data} />
    </Suspense>
  );
}
