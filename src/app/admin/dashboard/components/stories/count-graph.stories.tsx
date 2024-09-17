// CountGraph.stories.tsx
import { Meta, StoryFn } from "@storybook/react";

import { CountGraph } from "../count-graph";

const meta: Meta = {
  title: "Components/CountGraph",
  component: CountGraph,
};

export default meta;

// Define the story
const Template: StoryFn<{ data: { name: string; total: number }[] }> = (
  args,
) => {
  return <CountGraph {...args} />;
};

// Default story with example data
export const Default = Template.bind({});
Default.args = {
  data: [
    { name: "Category 1", total: 400 },
    { name: "Category 2", total: 300 },
    { name: "Category 3", total: 200 },
    { name: "Category 4", total: 278 },
    { name: "Category 5", total: 189 },
  ],
};

// Story with varied data
export const VariedData = Template.bind({});
VariedData.args = {
  data: [
    { name: "Category A", total: 500 },
    { name: "Category B", total: 100 },
    { name: "Category C", total: 300 },
    { name: "Category D", total: 400 },
    { name: "Category E", total: 250 },
  ],
};
