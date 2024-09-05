import { render, screen } from "@testing-library/react";

import Footer from "../footer";

describe("Testing Footer component", () => {
  it("should render the footer correctly", () => {
    render(<Footer />);

    const title = screen.getByText(
      /automáticamente generado con inteligencia artificial/i,
    );
    expect(title).toBeInTheDocument();

    const learnMoreLink = screen.getByRole("link", { name: /saber más/i });
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute(
      "href",
      "https://www.bocono-labs.com/work",
    );

    const githubLink = screen.getByRole("link", {
      name: /ver repo en github/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/luisignaciocc/tech-news",
    );
  });
});
