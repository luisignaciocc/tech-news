import { CheckboxProvider } from "../context/checkbox-context";
import AddSource from "./components/add-source";
import SourcesTable from "./components/sources-table";
import { getSourcesData } from "./utils/prisma";

interface SourcesData {
  id: number;
  name: string;
  lastUpdateAt: Date;
  isActive: boolean;
  newsCount: number;
}

async function SourcesPage() {
  const { newsSources, newsSourcesWithCount } = await getSourcesData();

  return (
    <div>
      <CheckboxProvider>
        <AddSource />
        <SourcesTable
          data={newsSources as SourcesData[]}
          newsCount={newsSourcesWithCount}
        />
      </CheckboxProvider>
    </div>
  );
}

export default SourcesPage;
