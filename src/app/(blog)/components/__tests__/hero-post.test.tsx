import { render, screen } from "@testing-library/react";

import { HeroPost } from "../hero-post";

describe("Testing HeroPost component", () => {
  const mockProps = {
    title: "Sample Post Title",
    coverImage: "https://example.com/image.jpg",
    date: new Date("2023-08-28"),
    excerpt: "This is a sample excerpt for the post.",
    author: {
      name: "Author Name",
      picture: "https://example.com/avatar.jpg",
    },
    slug: "sample-post",
  };

  it("should render the HeroPost correctly", () => {
    render(<HeroPost {...mockProps} />);

    // Verify that the title is present
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();

    // Verify that at least one link with the title is present
    const linkElements = screen.getAllByRole("link", { name: mockProps.title });
    expect(linkElements.length).toBeGreaterThan(0);

    // Verify that at least one of the links has the correct href attribute
    const linkElement = linkElements[0];
    expect(linkElement).toHaveAttribute("href", `/posts/${mockProps.slug}`);

    // Verify that the cover image is present
    const coverImage = screen.getByAltText(
      `Cover Image for ${mockProps.title}`,
    );
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute("src", mockProps.coverImage);

    // Verify that the date is present using the <time> element
    const dateElement = screen.getByText(/agosto/i);
    expect(dateElement).toBeInTheDocument();

    // Verify that the extract is present
    const excerptElement = screen.getByText(mockProps.excerpt);
    expect(excerptElement).toBeInTheDocument();

    // Verify that the Avatar component is present
    const avatarImg = screen.getByAltText(mockProps.author.name);
    expect(avatarImg).toBeInTheDocument();

    // Verify that the src contains the expected URL
    expect(avatarImg).toHaveAttribute(
      "src",
      expect.stringContaining("avatar.jpg"),
    ); // Verify that the src contains part of the URL
  });
});
