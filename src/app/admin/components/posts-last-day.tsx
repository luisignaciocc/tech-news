import "react-loading-skeleton/dist/skeleton.css";

import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import { countPostsLastDay, countTotalPosts } from "../utils/prisma";

export async function PostsLastDaySkeleton() {
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

export async function PostsLastDay() {
  const postsLastDay = await countPostsLastDay();
  const totalPosts = await countTotalPosts();

  const publishedPercentage = () => {
    try {
      const percentage = ((postsLastDay / totalPosts) * 100).toFixed(2);

      return percentage;
    } catch (error) {
      return 0;
    }
  };

  const percentage = publishedPercentage();

  return (
    <Fragment>
      <div className="text-2xl font-bold">{postsLastDay}</div>
      <p className="text-xs text-muted-foreground">{percentage}%</p>
    </Fragment>
  );
}
