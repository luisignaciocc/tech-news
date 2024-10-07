import { render, screen } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { MoreStories } from "../more-stories";

describe("Testing MoreStories Component", () => {
  const mockPosts = [
    {
      slug: "post-1",
      title: "Post 1",
      coverImage: "/images/image1.jpg",
      createdAt: new Date(),
      excerpt: "Excerpt 1",
      author: {
        name: "Author 1",
        picture: "/images/author1.jpg",
      },
      tags: [{ name: "Tag1" }],
    },
    {
      slug: "post-2",
      title: "Post 2",
      coverImage: "/images/image2.jpg",
      createdAt: new Date(),
      excerpt: "Excerpt 2",
      author: {
        name: "Author 2",
        picture: "/images/author2.jpg",
      },
      tags: [{ name: "Tag2" }],
    },
  ];

  it("should render all post previews correctly", () => {
    render(<MoreStories posts={mockPosts} />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("should render the 'Ver posts mas antiguos' button when hasMorePosts is true", () => {
    render(<MoreStories posts={mockPosts} hasMorePosts={true} />, {
      wrapper: MemoryRouterProvider,
    });

    const moreButton = screen.getByRole("link", {
      name: "Ver posts mas antiguos",
    });
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).toHaveAttribute("href", "/record/2");
  });

  it("should not render the 'Ver posts mas antiguos' button when hasMorePosts is false", () => {
    render(<MoreStories posts={mockPosts} hasMorePosts={false} />, {
      wrapper: MemoryRouterProvider,
    });

    expect(
      screen.queryByText("Ver posts mas antiguos"),
    ).not.toBeInTheDocument();
  });
});
