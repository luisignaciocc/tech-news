import { Meta, StoryFn } from "@storybook/react";

import SecondTagSection from "../second-tag-section";

const meta: Meta = {
  title: "Components/SecondTagSection",
  component: SecondTagSection,
};

export default meta;

// Test data
const postsByTags = [
  {
    id: "1",
    title: "Título del Post 1",
    coverImage: "https://via.placeholder.com/400x200",
    author: {
      id: "1",
      name: "Autor 1",
      picture: "https://via.placeholder.com/100",
    },
    slug: "titulo-del-post-1",
    excerpt: "Resumen del Post 1.",
    tags: [{ nameEs: "Etiqueta1", nameEn: "tag1" }],
    createdAt: new Date("2023-09-01"),
  },
  {
    id: "2",
    title: "Título del Post 2",
    coverImage: "https://via.placeholder.com/400x200",
    author: {
      id: "2",
      name: "Autor 2",
      picture: "https://via.placeholder.com/100",
    },
    slug: "titulo-del-post-2",
    excerpt: "Resumen del Post 2.",
    tags: [{ nameEs: "Etiqueta2", nameEn: "tag2" }],
    createdAt: new Date("2023-09-02"),
  },
  {
    id: "3",
    title: "Título del Post 3",
    coverImage: "https://via.placeholder.com/400x200",
    author: {
      id: "3",
      name: "Autor 3",
      picture: "https://via.placeholder.com/100",
    },
    slug: "titulo-del-post-3",
    excerpt: "Resumen del Post 3.",
    tags: [{ nameEs: "Etiqueta3", nameEn: "tag3" }],
    createdAt: new Date("2023-09-03"),
  },
];

// We define the story
const Template: StoryFn<{
  secondMostUsedTag: string[];
  postsByTags: typeof postsByTags;
}> = (args) => <SecondTagSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  secondMostUsedTag: ["tag1"],
  postsByTags,
};
