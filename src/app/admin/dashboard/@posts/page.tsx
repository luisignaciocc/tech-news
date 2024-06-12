import {
  countPostsLastDay,
  countPostsLastNinetyDays,
  countPostsLastSevenDays,
  countPostsLastThirtyDays,
} from "@/app/admin/utils/prisma";
import { TabsContent } from "@/components/ui/tabs";

import { CountCard } from "../components/count-card";
import PostsCountCard from "../components/posts-count-card";
import RecentPostsCard from "../components/recent-posts-card";

function PostsPage() {
  return (
    <TabsContent value="Posts" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CountCard
          title="Publicados los Ultimos 7 Dias"
          getCount={countPostsLastSevenDays}
        />
        <CountCard
          title="Publicados los Ultimos 30 Dias"
          getCount={countPostsLastThirtyDays}
        />
        <CountCard
          title="Publicados los Ultimos 90 Dias"
          getCount={countPostsLastNinetyDays}
        />
        <CountCard
          title="Publicados las Ult. 24 Horas"
          getCount={countPostsLastDay}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 h-full">
          <PostsCountCard />
        </div>
        <div className="col-span-3">
          <RecentPostsCard />
        </div>
      </div>
    </TabsContent>
  );
}

export default PostsPage;
