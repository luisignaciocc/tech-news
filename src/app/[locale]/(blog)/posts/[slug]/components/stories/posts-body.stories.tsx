import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { PostBody } from "../post-body";

const meta: Meta = {
  title: "Components/PostBody",
  component: PostBody,
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;

// We define the story
const Template: StoryFn<{ content: string }> = (args) => {
  return <PostBody {...args} />;
};

// Default story with example content
export const Default = Template.bind({});
Default.args = {
  content:
    "<h1>Título del Post</h1><p>Este es el contenido del post. <strong>Texto en negrita</strong> y <em>texto en cursiva</em>.</p>",
};
