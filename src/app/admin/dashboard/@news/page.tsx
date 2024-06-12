import { Fragment } from "react";

import { CountCard } from "../components/count-card";
import { CountGraphCard } from "../components/count-graph-card";
import { RecentsTableCard } from "../components/recent-table-card";
import {
  RecentNews,
  RecentNewsLoadingSkeleton,
} from "./components/recent-news-list";
import {
  getCollectedNews,
  getCollectedNewsGroupByDate,
  getLastDayNewsStats,
  getValidatedNews,
  getValidatedNewsGroupByDate,
} from "./utils/prisma";

function Page() {
  return (
    <Fragment>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <CountCard
          title="Colectadas las Ult. 24 Horas"
          getCount={() => getLastDayNewsStats()}
        />
        <CountCard
          title="Con información incompleta"
          getCount={() =>
            getLastDayNewsStats({
              deletedAt: {
                not: null,
              },
              OR: [
                {
                  coverImage: null,
                },
                {
                  vectorized: false,
                },
                {
                  parsed: false,
                },
              ],
            })
          }
        />
        <CountCard
          title="Descartadas automaticamente"
          getCount={() =>
            getLastDayNewsStats({
              sentToApproval: false,
              coverImage: {
                not: null,
              },
              deletedAt: {
                not: null,
              },
            })
          }
        />
        <CountCard
          title="Descartadas manualmente"
          getCount={() =>
            getLastDayNewsStats({
              sentToApproval: true,
              deletedAt: {
                not: null,
              },
            })
          }
        />
        <CountCard
          title="Publicadas / Por Publicar"
          getCount={() => getLastDayNewsStats({ filtered: true })}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 h-full">
          <CountGraphCard
            title="Noticias Válidas"
            getData={getValidatedNewsGroupByDate}
          />
        </div>
        <div className="col-span-3">
          <RecentsTableCard
            title="Noticias Validadas para Publicar"
            fallback={<RecentNewsLoadingSkeleton />}
          >
            <RecentNews k="valid" getData={getValidatedNews} />
          </RecentsTableCard>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-3">
          <RecentsTableCard
            title="Ultimas Noticias Colectadas"
            fallback={<RecentNewsLoadingSkeleton />}
          >
            <RecentNews k="collected" getData={getCollectedNews} />
          </RecentsTableCard>
        </div>
        <div className="col-span-4 h-full">
          <CountGraphCard
            title="Noticias Colectadas"
            getData={getCollectedNewsGroupByDate}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Page;
