import { Meta, StoryFn } from "@storybook/react";

import PostVerticalCarousel from "../post-vertical-carousel";

const meta: Meta = {
  title: "Components/PostVerticalCarousel",
  component: PostVerticalCarousel,
};

export default meta;

// Test data
const posts = [
  {
    id: "1",
    slug: "post-1",
    title: "Post 1",
    excerpt: "Resumen del Post 1",
    coverImage: "https://via.placeholder.com/800x400",
    publishedAt: new Date("2023-09-01"),
    tags: [{ id: 1, name: "tag1" }],
  },
  {
    id: "2",
    slug: "post-2",
    title: "Post 2",
    excerpt: "Resumen del Post 2",
    coverImage: "https://via.placeholder.com/800x400",
    publishedAt: new Date("2023-09-02"),
    tags: [{ id: 2, name: "tag2" }],
  },
  {
    id: "3",
    slug: "post-3",
    title: "Post 3",
    excerpt: "Resumen del Post 3",
    coverImage: "https://via.placeholder.com/800x400",
    publishedAt: new Date("2023-09-03"),
    tags: [{ id: 3, name: "tag3" }],
  },
];

type Props = {
  posts: typeof posts;
};

// We define the story
const Template: StoryFn<Props> = (args) => <PostVerticalCarousel {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts,
};
