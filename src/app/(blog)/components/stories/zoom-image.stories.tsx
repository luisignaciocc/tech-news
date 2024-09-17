// ZoomImage.stories.tsx
import { Meta, StoryFn } from "@storybook/react";

import ZoomImage from "../zoom-image";

const meta: Meta = {
  title: "Components/ZoomImage",
  component: ZoomImage,
  argTypes: {
    title: { control: "text" },
    src: { control: "text" },
    slug: { control: "text" },
  },
};

export default meta;

// We define the story
const Template: StoryFn<{ title: string; src: string; slug?: string }> = (
  args,
) => {
  return <ZoomImage {...args} />;
};
// Story with link
export const WithLink = Template.bind({});
WithLink.args = {
  title: "Sample Image with Link",
  src: "https://via.placeholder.com/820x630",
  slug: "sample-image",
};

// Story without link
export const WithoutLink = Template.bind({});
WithoutLink.args = {
  title: "Sample Image without Link",
  src: "https://via.placeholder.com/820x630",
};
