import { act, render, screen, waitFor } from "@testing-library/react";

import PostCarousel from "../posts-carousel";

const mockPosts = [
  {
    id: "1",
    slug: "sample-post-1",
    title: "Sample Post 1",
    coverImage: "https://example.com/image1.jpg",
    publishedAt: new Date("2023-08-28"),
    tags: [{ id: 1, nameEs: "Tecnología", nameEn: "Tech" }],
  },
  {
    id: "2",
    slug: "sample-post-2",
    title: "Sample Post 2",
    coverImage: "https://example.com/image2.jpg",
    publishedAt: new Date("2023-08-29"),
    tags: [{ id: 2, nameEs: "Salud", nameEn: "Health" }],
  },
];

describe("Testing PostCarousel Component", () => {
  it("should render the PostCarousel correctly", () => {
    render(<PostCarousel posts={mockPosts} />);

    mockPosts.forEach((post) => {
      const titleElement = screen.getByText(post.title);
      expect(titleElement).toBeInTheDocument();
    });

    mockPosts.forEach((post) => {
      const coverImage = screen.getByAltText(`Cover Image for ${post.title}`);
      expect(coverImage).toBeInTheDocument();
    });
  });

  it("should change post automatically", async () => {
    jest.useFakeTimers(); // To control the timer

    render(<PostCarousel posts={mockPosts} />);

    // Verify that the first post is displayed initially
    expect(screen.getByText("Sample Post 1")).toBeVisible();

    // Advance time to check automatic transmission
    act(() => {
      jest.advanceTimersByTime(3000); // Speed ​​up the timer
    });

    await waitFor(() => {
      expect(screen.getByText("Sample Post 2")).toBeVisible(); // Check that it changes to the second post
    });

    jest.useRealTimers(); // Reset the timer
  });
});
