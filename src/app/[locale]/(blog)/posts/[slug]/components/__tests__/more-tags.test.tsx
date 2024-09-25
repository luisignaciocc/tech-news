import { render, screen } from "@testing-library/react";

import MoreTags from "../more-tags";

const mockTags = [
  { id: 1, name: "Tag 1" },
  { id: 2, name: "Tag 2" },
  { id: 3, name: "Tag 3" },
];

describe("Testing MoreTags component", () => {
  it("should render the tags as links correctly", () => {
    render(<MoreTags tags={mockTags} />);

    mockTags.forEach((tag) => {
      const tagLink = screen.getByRole("link", {
        name: tag.name.toLowerCase(),
      });
      expect(tagLink).toBeInTheDocument();
      expect(tagLink).toHaveAttribute("href", `/posts/tags/${tag.name}`);
    });
  });
});
