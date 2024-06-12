import { TabsList, TabsTrigger } from "@/components/ui/tabs";

function DashboardTabList() {
  return (
    <TabsList>
      <TabsTrigger value="Posts">Posts</TabsTrigger>
      <TabsTrigger value="analytics" disabled>
        Analytics
      </TabsTrigger>
      <TabsTrigger value="reports" disabled>
        Reports
      </TabsTrigger>
      <TabsTrigger value="notifications" disabled>
        Notifications
      </TabsTrigger>
    </TabsList>
  );
}

export default DashboardTabList;
