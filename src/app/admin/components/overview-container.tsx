"use server";

import { Fragment } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getPostsGroupByDate } from "../utils/prisma";
import { Overview } from "./overview";

export async function OverviewContainer() {
  const data = await getPostsGroupByDate();

  return (
    <Fragment>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={data} />
        </CardContent>
      </Card>
    </Fragment>
  );
}
