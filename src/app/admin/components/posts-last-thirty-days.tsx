import "react-loading-skeleton/dist/skeleton.css";

import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import { countPostsLastThirtyDays, countTotalPosts } from "../utils/prisma";

export function PostsLastThirtyDaysSkeleton() {
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

export async function PostsLastThirtyDays() {
  const postsLastThirtyDays = await countPostsLastThirtyDays();
  const totalPosts = await countTotalPosts();

  const publishedPercentage = () => {
    try {
      const percentage = ((postsLastThirtyDays / totalPosts) * 100).toFixed(2);

      return percentage;
    } catch (error) {
      return 0;
    }
  };

  const percentage = publishedPercentage();

  return (
    <Fragment>
      <div className="text-2xl font-bold">{postsLastThirtyDays}</div>
      <p className="text-xs text-muted-foreground">{percentage}%</p>
    </Fragment>
  );
}
