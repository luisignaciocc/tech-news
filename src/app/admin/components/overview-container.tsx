"use server";

import { getPostsGroupByDate } from "../utils/prisma/get-posts-gruop-by-date";
import { Overview } from "./overview";

export async function OverviewContainer() {
  const data = await getPostsGroupByDate();

  return <Overview data={data} />;
}
