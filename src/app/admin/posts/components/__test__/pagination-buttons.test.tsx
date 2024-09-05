import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import PageNavigation from "../pagination-buttons";

jest.mock("next/navigation");

describe("Testing PageNavigation Component", () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should render previous button enabled when page is greater than 1", () => {
    render(<PageNavigation page={2} hasMorePages={true} />);

    const buttons = screen.getAllByRole("button");

    const prevButton = buttons[0];
    expect(prevButton).toBeEnabled();
  });

  it("should render previous button disabled when page is 1", () => {
    render(<PageNavigation page={1} hasMorePages={true} />);

    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];
    expect(prevButton).toBeDisabled();
  });

  it("should render next button enabled when there are more pages", () => {
    render(<PageNavigation page={1} hasMorePages={true} />);

    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];
    expect(nextButton).toBeEnabled();
  });

  it("should render next button disabled when there are no more pages", () => {
    render(<PageNavigation page={1} hasMorePages={false} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];
    expect(nextButton).toBeDisabled();
  });

  it("should navigate to the correct previous page", () => {
    render(<PageNavigation page={2} hasMorePages={true} />);

    const links = screen.getAllByRole("link");

    const prevLink = links.find(
      (link) => link.getAttribute("href") === "/admin/posts?page=1",
    );

    expect(prevLink).toBeInTheDocument();
  });

  it("should navigate to the correct next page", () => {
    render(<PageNavigation page={1} hasMorePages={true} />);

    const links = screen.getAllByRole("link");

    const nextLink = links.find(
      (link) => link.getAttribute("href") === "/admin/posts?page=2",
    );

    expect(nextLink).toBeInTheDocument();
  });
});
