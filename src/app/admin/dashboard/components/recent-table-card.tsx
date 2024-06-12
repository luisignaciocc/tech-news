import "react-loading-skeleton/dist/skeleton.css";

import React, { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentsTableCard({
  title,
  children,
  fallback,
}: {
  title: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={fallback}>{children}</Suspense>
      </CardContent>
    </Card>
  );
}
