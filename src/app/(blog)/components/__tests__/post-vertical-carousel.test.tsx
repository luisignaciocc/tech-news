import { fireEvent, render, screen } from "@testing-library/react";

import PostVerticalCarousel from "../post-vertical-carousel";

describe("Testing PostVerticalCarousel Component", () => {
  const mockPosts = [
    {
      id: "1",
      slug: "sample-post-1",
      title: "Sample Post 1",
      excerpt: "This is the first sample post.",
      coverImage: "https://example.com/image1.jpg",
      publishedAt: new Date("2023-08-28"),
      tags: [{ id: 1, name: "Tech" }],
    },
    {
      id: "2",
      slug: "sample-post-2",
      title: "Sample Post 2",
      excerpt: "This is the second sample post.",
      coverImage: "https://example.com/image2.jpg",
      publishedAt: new Date("2023-08-29"),
      tags: [{ id: 2, name: "Health" }],
    },
  ];

  it("should render the PostVerticalCarousel correctly", () => {
    render(<PostVerticalCarousel posts={mockPosts} />);

    mockPosts.forEach((post) => {
      const titleElement = screen.getByText(post.title);
      expect(titleElement).toBeInTheDocument();
    });

    mockPosts.forEach((post) => {
      const coverImage = screen.getByAltText(
        `Cover Image for ${post.title}`,
      ) as HTMLImageElement;
      expect(coverImage).toBeInTheDocument();

      const encodedImageUrl = encodeURIComponent(post.coverImage);
      expect(coverImage.src).toContain(`url=${encodedImageUrl}`);
    });

    mockPosts.forEach((post) => {
      const excerptElement = screen.getByText(post.excerpt);
      expect(excerptElement).toBeInTheDocument();
    });

    mockPosts.forEach((post) => {
      const tagLink = screen.getByRole("link", { name: post.tags[0].name });
      expect(tagLink).toBeInTheDocument();
      expect(tagLink).toHaveAttribute(
        "href",
        `/posts/tags/${post.tags[0].name}`,
      );
    });
  });

  it("should change the active post when clicking on index buttons", () => {
    render(<PostVerticalCarousel posts={mockPosts} />);

    // Verify that the first post is displayed initially
    expect(screen.getByText("Sample Post 1")).toBeVisible();

    // Simulates clicking the button down (looking for the container)
    const downButton = screen.getAllByRole("button")[1]; // Assuming the second button is the "next" button
    fireEvent.click(downButton);

    // Verify that the second post is displayed
    expect(screen.getByText("Sample Post 2")).toBeVisible();

    // Simulates clicking the up button (looking for the container)
    const upButton = screen.getAllByRole("button")[0]; // Assuming the first button is the "previous" button
    fireEvent.click(upButton);

    // Verify that the first post is displayed again
    expect(screen.getByText("Sample Post 1")).toBeVisible();
  });
});
