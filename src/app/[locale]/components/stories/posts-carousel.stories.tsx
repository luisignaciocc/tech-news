import { Meta, StoryFn } from "@storybook/react";

import PostCarousel from "../posts-carousel";

const meta: Meta = {
  title: "Components/PostCarousel",
  component: PostCarousel,
};

export default meta;

const posts = [
  {
    id: "1",
    slug: "post-1",
    title: "Post 1",
    coverImage: "https://via.placeholder.com/400x200",
    publishedAt: new Date("2023-09-01"),
    tags: [{ id: 1, nameEs: "Etiqueta1", nameEn: "tag1" }],
  },
  {
    id: "2",
    slug: "post-2",
    title: "Post 2",
    coverImage: "https://via.placeholder.com/400x200",
    publishedAt: new Date("2023-09-02"),
    tags: [{ id: 2, nameEs: "Etiqueta2", nameEn: "tag2" }],
  },
  {
    id: "3",
    slug: "post-3",
    title: "Post 3",
    coverImage: "https://via.placeholder.com/400x200",
    publishedAt: new Date("2023-09-03"),
    tags: [{ id: 3, nameEs: "Etiqueta3", nameEn: "tag3" }],
  },
];

// We define the story
const Template: StoryFn<{ posts: typeof posts }> = (args) => (
  <div className="w-4/12 h-56">
    <PostCarousel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  posts,
};
