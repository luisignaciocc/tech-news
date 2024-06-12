import { Fragment } from "react";

import { CountCard } from "./components/count-card";
import PostsCountCard from "./components/posts-count-card";
import RecentPostsCard from "./components/recent-posts-card";

function PostsPage() {
  return (
    <Fragment>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CountCard title="Publicados los Ultimos 7 Dias" days={7} />
        <CountCard title="Publicados los Ultimos 30 Dias" days={30} />
        <CountCard title="Publicados los Ultimos 90 Dias" days={90} />
        <CountCard title="Publicados las Ult. 24 Horas" days={1} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 h-full">
          <PostsCountCard />
        </div>
        <div className="col-span-3">
          <RecentPostsCard />
        </div>
      </div>
    </Fragment>
  );
}

export default PostsPage;
