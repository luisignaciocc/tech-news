import { Meta, StoryFn } from "@storybook/react";

import { SpecialCardPost } from "../special-card-post";

const meta: Meta = {
  title: "Components/SpecialCardPost",
  component: SpecialCardPost,
};

export default meta;

interface SpecialCardPostProps {
  imageUrl: string | null;
  title: string;
  slug: string;
  number: string;
}

// We define the story
const Template: StoryFn<SpecialCardPostProps> = (args) => (
  <SpecialCardPost {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imageUrl: "https://via.placeholder.com/100",
  title: "Título del Post Especial",
  slug: "titulo-del-post-especial",
  number: "1",
};
