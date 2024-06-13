"use client";
import "react-loading-skeleton/dist/skeleton.css";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Spinner from "@/components/spinner";

export function CountGraphSkeleton() {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <Spinner className="h-24 w-24" />
    </div>
  );
}

export function CountDoubleGraph({
  data1,
  data2,
  dataKeys,
}: {
  data1: { name: string; total: number }[];
  data2: { name: string; total: number }[];
  dataKeys: [string, string];
}) {
  const combinedData = data1.map((item) => {
    const item2 = data2.find((i) => i.name === item.name);

    return {
      name: item.name,
      [dataKeys[0]]: item.total,
      [dataKeys[1]]: item2?.total || 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={combinedData} margin={{ bottom: 20 }}>
        <XAxis
          type="category"
          dataKey="name"
          stroke="#71717A"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
        />
        <YAxis
          type="number"
          stroke="#71717A"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar dataKey={dataKeys[0]} fill="black" />
        <Bar dataKey={dataKeys[1]} fill="#71717A" />
      </BarChart>
    </ResponsiveContainer>
  );
}
