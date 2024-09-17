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
    <div className="flex flex-wrap justify-center mx-5 md:mx-8 xl:mx-14 mb-5">
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
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  posts: [
    { slug: "post-1", title: "Titulo del Post numero 1" },
    { slug: "post-2", title: "Titulo del Post numero 2" },
    { slug: "post-3", title: "Titulo del Post numero 3" },
    { slug: "post-4", title: "Titulo del Post numero 4" },
  ],
};
