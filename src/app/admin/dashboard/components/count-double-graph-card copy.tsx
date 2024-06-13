"use server";

import { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CountDoubleGraph } from "./count-double-graph";
import { CountGraphSkeleton } from "./count-graph";

async function GraphWrapper({
  getData1,
  getData2,
  dataKeys,
}: {
  getData1: () => Promise<{ name: string; total: number }[]>;
  getData2: () => Promise<{ name: string; total: number }[]>;
  dataKeys: [string, string];
}) {
  const [data1, data2] = await Promise.all([getData1(), getData2()]);

  return <CountDoubleGraph data1={data1} data2={data2} dataKeys={dataKeys} />;
}

export async function CountDoubleGraphCard({
  title,
  getData1,
  getData2,
  dataKeys,
}: {
  title: string;
  getData1: () => Promise<{ name: string; total: number }[]>;
  getData2: () => Promise<{ name: string; total: number }[]>;
  dataKeys: [string, string];
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 pt-6 h-full">
        <Suspense fallback={<CountGraphSkeleton />}>
          <GraphWrapper
            getData1={getData1}
            getData2={getData2}
            dataKeys={dataKeys}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
