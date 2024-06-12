"use client";
import "react-loading-skeleton/dist/skeleton.css";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import Spinner from "@/components/spinner";

export function CountGraphSkeleton() {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <Spinner className="h-24 w-24" />
    </div>
  );
}

export function CountGraph({
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
