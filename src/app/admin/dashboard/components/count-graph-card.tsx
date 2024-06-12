"use server";

import { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CountGraph, CountGraphSkeleton } from "./count-graph";

async function GraphWrapper({
  getData,
}: {
  getData: () => Promise<{ name: string; total: number }[]>;
}) {
  const data = await getData();

  return <CountGraph data={data} />;
}

export async function CountGraphCard({
  title,
  getData,
}: {
  title: string;
  getData: () => Promise<{ name: string; total: number }[]>;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 pt-6 h-full">
        <Suspense fallback={<CountGraphSkeleton />}>
          <GraphWrapper getData={getData} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
