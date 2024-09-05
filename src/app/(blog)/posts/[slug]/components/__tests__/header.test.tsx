import { render, screen } from "@testing-library/react";

import Header from "../header";

describe("Testing Header component", () => {
  it("should render the header correctly", () => {
    render(<Header />);

    // Check that the header is rendered
    const headerElement = screen.getByRole("heading", { level: 2 });
    expect(headerElement).toBeInTheDocument();

    // Check that the link is present
    const linkElement = screen.getByRole("link", { name: "Blog" });
    expect(linkElement).toBeInTheDocument();

    // Check that the link has the class 'hover:underline'
    expect(linkElement).toHaveClass("hover:underline");
  });
});
