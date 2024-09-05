import { render, screen } from "@testing-library/react";

import { PostTitle } from "../post-title";

describe("Testing PostTitle component", () => {
  it("should render the title correctly", () => {
    const titleText = "Test Post Title";

    render(<PostTitle>{titleText}</PostTitle>);

    expect(
      screen.getByRole("heading", { name: titleText }),
    ).toBeInTheDocument();
    expect(screen.getByText(titleText)).toBeInTheDocument();
  });
});
