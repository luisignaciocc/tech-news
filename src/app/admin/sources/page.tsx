import SourcesTable from "./components/sources-table";
import { getSourcesData } from "./utils/prisma";

interface SourcesData {
  id: number;
  name: string;
  lastUpdateAt: Date;
  newsCount: number;
}

async function SourcesPage() {
  const { newsSources, newsSourcesWithCount } = await getSourcesData();

  return (
    <div>
      <SourcesTable
        data={newsSources as SourcesData[]}
        newsCount={newsSourcesWithCount}
      />
    </div>
  );
}

export default SourcesPage;
