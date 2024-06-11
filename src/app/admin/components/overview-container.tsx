"use server";

import { Overview } from "./overview";
import { getPostDate } from "./post-date";

export async function OverviewContainer() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await getPostDate();

  return <Overview data={data} />;
}
