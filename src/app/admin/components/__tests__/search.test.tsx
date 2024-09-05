import { render, screen } from "@testing-library/react";

import { Search } from "../search";

describe("Testing Search Component", () => {
  it("should render the search input", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "search");
  });
});
