import { render, screen } from "@testing-library/react";

import { PostPreview } from "../post-preview";

describe("Testing PostPreview Component", () => {
  const mockProps = {
    title: "Sample Post Title",
    coverImage: "https://example.com/image.jpg",
    date: new Date("2023-08-28"),
    excerpt: "This is a sample excerpt for the post.",
    slug: "sample-post",
    tags: [{ name: "Tech" }],
    author: {
      name: "Author Name",
      picture: "https://example.com/avatar.jpg",
    },
  };

  it("should render the PostPreview correctly", () => {
    render(<PostPreview {...mockProps} />);

    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();

    const titleLinks = screen.getAllByRole("link", { name: mockProps.title });
    expect(titleLinks.length).toBeGreaterThan(0);
    expect(titleLinks[0]).toHaveAttribute("href", `/posts/${mockProps.slug}`);

    const coverImage = screen.getByAltText(
      `Cover Image for ${mockProps.title}`,
    ) as HTMLImageElement;
    expect(coverImage).toBeInTheDocument();

    const encodedImageUrl = encodeURIComponent(mockProps.coverImage);
    expect(coverImage.src).toContain(`url=${encodedImageUrl}`);

    const dateElement = screen.getByText(/agosto/i);
    expect(dateElement).toBeInTheDocument();

    const excerptElement = screen.getByText(mockProps.excerpt);
    expect(excerptElement).toBeInTheDocument();

    const tagLink = screen.getByRole("link", { name: mockProps.tags[0].name });
    expect(tagLink).toBeInTheDocument();
    expect(tagLink).toHaveAttribute(
      "href",
      `/posts/tags/${mockProps.tags[0].name}`,
    );
  });
});
