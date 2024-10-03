import { Meta, StoryFn } from "@storybook/react";

import { PostPreview } from "../post-preview";

const meta: Meta = {
  title: "Components/PostPreview",
  component: PostPreview,
};

export default meta;

interface PostPreviewProps {
  title: string | React.ReactNode;
  coverImage?: string | null;
  date: Date;
  excerpt?: string | null;
  author: {
    name: string;
    picture: string;
  };
  slug: string;
  tags: {
    name: string;
  }[];
}

// Test data
const post = {
  title: "Título del Post",
  coverImage: "https://via.placeholder.com/400x200",
  date: new Date("2023-09-01"),
  excerpt: "Este es un resumen del post que muestra información interesante.",
  author: {
    name: "Autor del Post",
    picture: "https://via.placeholder.com/100",
  },
  slug: "titulo-del-post",
  tags: [{ name: "tag1" }],
};

// We define the story
const Template: StoryFn<PostPreviewProps> = (args) => (
  <PostPreview {...args} locale={"es"} />
);

export const Default = Template.bind({});
Default.args = {
  ...post,
};
