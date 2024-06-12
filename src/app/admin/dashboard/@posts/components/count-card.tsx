import { Fragment, Suspense } from "react";
import Skeleton from "react-loading-skeleton";

import { countTotalPosts } from "@/app/admin/utils/prisma";
import { countPostsLastDays } from "@/app/admin/utils/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CountCardLoadingSkeleton() {
  return (
    <Fragment>
      <div className="text-2xl font-bold">
        <Skeleton width={60} />
      </div>
      <p className="text-xs text-muted-foreground">
        <Skeleton width={45} />
      </p>
    </Fragment>
  );
}

async function Counter({ days }: { days: number }) {
  const [totalPosts, specificCount] = await Promise.all([
    countTotalPosts(),
    countPostsLastDays(days),
  ]);

  const percentage = ((specificCount / totalPosts) * 100).toFixed(2);

  return (
    <Fragment>
      <div className="text-2xl font-bold">{specificCount}</div>
      <p className="text-xs text-muted-foreground">{percentage}%</p>
    </Fragment>
  );
}

export async function CountCard({
  title,
  days,
}: {
  title: string;
  days: number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<CountCardLoadingSkeleton />}>
          <Counter days={days} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
