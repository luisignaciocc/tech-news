import { render, screen } from "@testing-library/react";
import React from "react";

import { SpecialCardPost } from "../special-card-post";

// Next.js Image Component Mock
jest.mock("next/image", () => {
  const MockImage: React.FC<{
    src: string;
    alt?: string;
    [key: string]: unknown;
  }> = ({ src, alt: _alt, ...props }) => {
    if (src) {
      return <div data-testid="mock-image" {...props} />;
    }
    return null;
  };
  MockImage.displayName = "MockImage"; // Assign display name
  return MockImage;
});

describe("Testing SpecialCardPost Component", () => {
  const props = {
    imageUrl: "https://example.com/image.jpg",
    title: "Sample Post Title",
    slug: "sample-post",
    number: "1",
  };

  it("should render the component correctly", () => {
    render(<SpecialCardPost {...props} />);

    // Verify that the mock image renders correctly
    const image = screen.getByTestId("mock-image");
    expect(image).toBeInTheDocument();

    // Verify that the title renders and is a link
    const titleLink = screen.getByRole("link", { name: props.title });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", `/posts/${props.slug}`);

    // Verify that the number is rendered correctly
    expect(screen.getByText(props.number)).toBeInTheDocument();
  });

  it("should render without an image", () => {
    const propsWithoutImage = { ...props, imageUrl: null };
    render(<SpecialCardPost {...propsWithoutImage} />);

    const image = screen.queryByTestId("mock-image");
    expect(image).not.toBeInTheDocument(); // The image mockup should not be in the document
  });
});
