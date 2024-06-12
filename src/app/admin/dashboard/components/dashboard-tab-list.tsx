import { TabsList, TabsTrigger } from "@/components/ui/tabs";

function DashboardTabList() {
  return (
    <TabsList>
      <TabsTrigger value="posts">Posts</TabsTrigger>
      <TabsTrigger value="news">News</TabsTrigger>
      <TabsTrigger value="reports">Reports</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
    </TabsList>
  );
}

export default DashboardTabList;
