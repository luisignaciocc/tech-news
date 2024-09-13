import { Meta, StoryFn } from "@storybook/react";
import Link from "next/link";
import React, { Fragment } from "react";

import { HeadlinePosts } from "../headline-posts";

// We simulate the data of the posts
const getRandomPostsFromTwoWeeksAgo = (
  posts: { slug: string; title: string }[],
) => {
  return posts;
};

// Storybook Settings
const meta: Meta = {
  title: "Components/HeadlinePosts",
  component: HeadlinePosts,
  argTypes: {
    posts: {
      control: {
        type: "object", // Allows you to enter an array of objects
      },
    },
  },
};

export default meta;

// We define history
const Template: StoryFn<{ posts: { slug: string; title: string }[] }> = (
  args,
) => {
  const postsForHeadline = getRandomPostsFromTwoWeeksAgo(args.posts);

  return (
    <Fragment>
      {postsForHeadline.map((post, index) => (
        <div key={index}>
          <Link href={`/posts/${post.slug}`}>
            <div className="mr-5 text-xs font-bold hover:text-gray-400 leading-tight tracking-tight">
              {post.title}
            </div>
          </Link>
        </div>
      ))}
    </Fragment>
  );
};

export const Default = Template.bind({});
Default.args = {
  posts: [
    { slug: "post-1", title: "Post 1" },
    { slug: "post-2", title: "Post 2" },
    { slug: "post-3", title: "Post 3" },
    { slug: "post-4", title: "Post 4" },
  ],
};
