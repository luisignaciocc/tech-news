import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  value: string;
  label: string;
}

interface TabListProps {
  tabs: Tab[];
}

function TabsButtons({ tabs }: TabListProps) {
  return (
    <TabsList>
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

export default TabsButtons;
