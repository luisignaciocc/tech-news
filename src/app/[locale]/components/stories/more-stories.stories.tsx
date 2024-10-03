import { Meta, StoryFn } from "@storybook/react";

import { MoreStories } from "../more-stories";

const meta: Meta = {
  title: "Components/MoreStories",
  component: MoreStories,
};

export default meta;

// Test data
const posts = [
  {
    slug: "post-1",
    title: "Título del Post 1",
    coverImage: "https://via.placeholder.com/400x200",
    createdAt: new Date("2023-09-01"),
    excerpt: "Este es un resumen del Post 1.",
    author: {
      name: "Autor 1",
      picture: "https://via.placeholder.com/100",
    },
    tags: [{ name: "tag1" }],
  },
  {
    slug: "post-2",
    title: "Título del Post 2",
    coverImage: "https://via.placeholder.com/400x200",
    createdAt: new Date("2023-09-02"),
    excerpt: "Este es un resumen del Post 2.",
    author: {
      name: "Autor 2",
      picture: "https://via.placeholder.com/100",
    },
    tags: [{ name: "tag2" }],
  },
  {
    slug: "post-3",
    title: "Título del Post 3",
    coverImage: "https://via.placeholder.com/400x200",
    createdAt: new Date("2023-09-03"),
    excerpt: "Este es un resumen del Post 3.",
    author: {
      name: "Autor 3",
      picture: "https://via.placeholder.com/100",
    },
    tags: [{ name: "tag3" }],
  },
];

// We define the story
const Template: StoryFn<{ posts: typeof posts; hasMorePosts?: boolean }> = (
  args,
) => <MoreStories {...args} locale={"es"} />;

export const Default = Template.bind({});
Default.args = {
  posts,
  hasMorePosts: true,
};
