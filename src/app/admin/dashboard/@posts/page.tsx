import { Fragment } from "react";

import { CountCard } from "../components/count-card";
import { CountGraphCard } from "../components/count-graph-card";
import { RecentsTableCard } from "../components/recent-table-card";
import {
  RecentPosts,
  RecentPostsLoadingSkeleton,
} from "./components/recent-posts-list";
import {
  countPostsLastDays,
  countPostsToPublish,
  getPostsGroupByDate,
} from "./utils/prisma";

function Page() {
  return (
    <Fragment>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CountCard
          title="En cola para publicar"
          getCount={() => countPostsToPublish()}
        />
        <CountCard
          title="Publicados las Ult. 24 Horas"
          getCount={() => countPostsLastDays(1)}
        />
        <CountCard
          title="Publicados los Ultimos 7 Dias"
          getCount={() => countPostsLastDays(7)}
        />
        <CountCard
          title="Publicados los Ultimos 30 Dias"
          getCount={() => countPostsLastDays(30)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 h-full">
          <CountGraphCard title="Posts" getData={getPostsGroupByDate} />
        </div>
        <div className="col-span-3">
          <RecentsTableCard
            title="Ultimos Posts Publicados"
            fallback={<RecentPostsLoadingSkeleton />}
          >
            <RecentPosts />
          </RecentsTableCard>
        </div>
      </div>
    </Fragment>
  );
}

export default Page;
