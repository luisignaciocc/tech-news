// CountDoubleGraph.stories.tsx
import { Meta, StoryFn } from "@storybook/react";

import { CountDoubleGraph } from "../count-double-graph";

const meta: Meta = {
  title: "Components/CountDoubleGraph",
  component: CountDoubleGraph,
};

export default meta;

// Define the story
const Template: StoryFn<{
  data1: { name: string; total: number }[];
  data2: { name: string; total: number }[];
  dataKeys: [string, string];
}> = (args) => {
  return <CountDoubleGraph {...args} />;
};

// Default story with example data
export const Default = Template.bind({});
Default.args = {
  data1: [
    { name: "Category 1", total: 400 },
    { name: "Category 2", total: 300 },
    { name: "Category 3", total: 200 },
    { name: "Category 4", total: 278 },
    { name: "Category 5", total: 189 },
  ],
  data2: [
    { name: "Category 1", total: 240 },
    { name: "Category 2", total: 456 },
    { name: "Category 3", total: 139 },
    { name: "Category 4", total: 310 },
    { name: "Category 5", total: 250 },
  ],
  dataKeys: ["data1", "data2"],
};
