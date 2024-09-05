// components/PageNavigation.test.js
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import PageNavigation from "../pagination-buttons";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Testing PageNavigation Component", () => {
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      refresh: mockRefresh,
    });
  });

  it("should render the left button as disabled on the first page", () => {
    render(<PageNavigation page={1} hasMorePages={true} tab="example" />);

    const leftButton = screen.getAllByRole("button")[0];
    expect(leftButton).toBeDisabled();
  });

  it("should render the left button as enabled on subsequent pages", () => {
    render(<PageNavigation page={2} hasMorePages={true} tab="example" />);

    const leftButton = screen.getAllByRole("button")[0];
    expect(leftButton).toBeEnabled();
  });

  it("should render the right button as enabled when there are more pages", () => {
    render(<PageNavigation page={1} hasMorePages={true} tab="example" />);

    const rightButton = screen.getAllByRole("button")[1];
    expect(rightButton).toBeEnabled();
  });

  it("should render the right button as disabled when there are no more pages", () => {
    render(<PageNavigation page={1} hasMorePages={false} tab="example" />);

    const rightButton = screen.getAllByRole("button")[1];
    expect(rightButton).toBeDisabled();
  });
});
