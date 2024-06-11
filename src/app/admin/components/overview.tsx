"use client";
import "react-loading-skeleton/dist/skeleton.css";

import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const generateSkeletonData = () => {
  const data = [];
  for (let i = 0; i < 15; i++) {
    data.push({
      height: `${Math.floor(Math.random() * 310)}px`,
      width: "34px",
    });
  }
  return data;
};

export function OverviewSkeleton() {
  const barData = generateSkeletonData();

  return (
    <Fragment>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="container mx-auto ml-5">
            <div className="flex justify-center items-end space-x-2">
              <div className="flex flex-col items-end mr-2">
                <Skeleton className="mb-10" width={20} height={20} />
                <Skeleton className="mb-10" width={20} height={20} />
                <Skeleton className="mb-10" width={20} height={20} />
                <Skeleton className="mb-10" width={20} height={20} />
                <Skeleton className="mb-16" width={20} height={20} />
              </div>
              {barData.map((bar, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Skeleton
                    key={index}
                    className="w-10 mb-2"
                    style={{ height: bar.height, width: bar.width }}
                  />
                  <div
                    className="transform -skewX-25 rotate-45"
                    style={{ transformOrigin: "top center" }}
                  >
                    <Skeleton
                      className="w-10"
                      style={{ height: "60px", width: "12px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export function Overview({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ bottom: 20 }}>
        <XAxis
          type="category"
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
        />
        <YAxis
          type="number"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
