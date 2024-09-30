import { render, screen } from "@testing-library/react";

import MoreTags from "../more-tags";

const mockTags = [
  { id: 1, nameEs: "Tag 1" },
  { id: 2, nameEs: "Tag 2" },
  { id: 3, nameEs: "Tag 3" },
];

describe("Testing MoreTags component", () => {
  it("should render the tags as links correctly", () => {
    render(<MoreTags tags={mockTags} />);

    mockTags.forEach((tag) => {
      const tagLink = screen.getByRole("link", {
        name: tag.nameEs.toLowerCase(),
      });
      expect(tagLink).toBeInTheDocument();
      expect(tagLink).toHaveAttribute("href", `/posts/tags/${tag.nameEs}`);
    });
  });
});
