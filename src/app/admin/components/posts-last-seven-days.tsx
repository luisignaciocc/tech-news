import "react-loading-skeleton/dist/skeleton.css";

import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { countPostsLastSevenDays, totalPostsCount } from "../utils/prisma";

export function PostsLastSevenDaysSkeleton() {
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

export async function PostsLastSevenDays() {
  const postsLastSevenDays = await countPostsLastSevenDays();
  const totalPosts = await totalPostsCount();

  const publishedPercentage = () => {
    try {
      const percentage = ((postsLastSevenDays / totalPosts) * 100).toFixed(2);

      return percentage;
    } catch (error) {
      return 0;
    }
  };

  const percentage = publishedPercentage();

  return (
    <Fragment>
      <div className="text-2xl font-bold">{postsLastSevenDays}</div>
      <p className="text-xs text-muted-foreground">{percentage}%</p>
    </Fragment>
  );
}
