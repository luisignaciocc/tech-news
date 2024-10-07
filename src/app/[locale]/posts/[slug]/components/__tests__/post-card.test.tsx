import { render, screen } from "@testing-library/react";
import React from "react";

import { PostCard } from "../post-card";

const mockProps = {
  imageUrl: "https://example.com/image.jpg",
  title: "Example Post",
  tags: [
    { id: 1, name: "tag1" },
    { id: 2, name: "tag2" },
  ],
  slug: "example-post",
};

describe("Testing PostCard component", () => {
  it("should render the component with the correct props", () => {
    render(<PostCard {...mockProps} />);

    // Check that the correct elements are displayed
    expect(screen.getByAltText("Example Post")).toBeInTheDocument();
    expect(screen.getByText("Example Post")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();

    // Gets all links with the name "Example Post"
    const postLinks = screen.getAllByRole("link", { name: "Example Post" });

    // Verify that there are exactly two links
    expect(postLinks).toHaveLength(2);

    // Check that links have the correct href attribute
    expect(postLinks[0]).toHaveAttribute("href", "/posts/example-post");
    expect(postLinks[1]).toHaveAttribute("href", "/posts/example-post");

    // Check tag links
    const tag1Link = screen.getByRole("link", { name: "tag1" });
    expect(tag1Link).toHaveAttribute("href", "/posts/tags/tag1");

    const tag2Link = screen.getByRole("link", { name: "tag2" });
    expect(tag2Link).toHaveAttribute("href", "/posts/tags/tag2");
  });
});
