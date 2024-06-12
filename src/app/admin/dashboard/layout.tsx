import { Tabs } from "@/components/ui/tabs";

import DashboardTabList from "./components/dashboard-tab-list";

export default function GroupedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="Posts" className="space-y-4">
        <DashboardTabList />
        {children}
      </Tabs>
    </div>
  );
}
