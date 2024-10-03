import { Meta, StoryFn } from "@storybook/react";

import { HeroPost } from "../hero-post";

const meta: Meta = {
  title: "Components/HeroPost",
  component: HeroPost,
};

export default meta;

type Author = {
  name: string;
  picture: string;
};

type Props = {
  title: string;
  coverImage: string | null;
  date: Date;
  excerpt: string | null;
  author: Author;
  slug: string;
};

// We define the story
const Template: StoryFn<Props> = (args: Props) => (
  <HeroPost {...args} locale={"es"} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Título del Post",
  coverImage: "https://via.placeholder.com/800x400",
  date: new Date("2023-09-01"),
  excerpt: "Este es un resumen del post que se presenta aquí.",
  author: {
    name: "Nombre del Autor",
    picture: "https://via.placeholder.com/100",
  },
  slug: "titulo-del-post",
};
