"use client";
import "react-loading-skeleton/dist/skeleton.css";

import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function OverviewSkeleton() {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          height: "350px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <Skeleton
              key={index}
              count={1}
              height={Math.floor(Math.random() * 200) + 50}
              width={40}
            />
          ))}
        </div>
      </div>
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
