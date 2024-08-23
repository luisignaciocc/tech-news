import { render, screen } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import PageNavigation from "../page-navigation";

describe("PageNavigation Component", () => {
  it("renders the 'Volver' button when currentPage is greater than 1", () => {
    render(<PageNavigation currentPage={2} hasMorePosts={true} />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("Volver")).toBeInTheDocument();
  });

  it("does not render the 'Volver' button when currentPage is 1", () => {
    render(<PageNavigation currentPage={1} hasMorePosts={true} />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.queryByText("Volver")).not.toBeInTheDocument();
  });

  it("renders the 'Más antiguos' button and it is enabled when hasMorePosts is true", () => {
    render(<PageNavigation currentPage={1} hasMorePosts={true} />, {
      wrapper: MemoryRouterProvider,
    });

    const moreButton = screen.getByText("Más antiguos");
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).toBeEnabled();
  });

  it("renders the 'Más antiguos' button but it is disabled when hasMorePosts is false", () => {
    render(<PageNavigation currentPage={1} hasMorePosts={false} />, {
      wrapper: MemoryRouterProvider,
    });

    const moreButton = screen.getByText("Más antiguos");
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).toBeDisabled();
  });

  it("renders the correct link for the 'Volver' button when currentPage is greater than 2", () => {
    render(<PageNavigation currentPage={3} hasMorePosts={true} />, {
      wrapper: MemoryRouterProvider,
    });

    const volverLink = screen.getByRole("link", { name: "Volver" });
    expect(volverLink).toHaveAttribute("href", "/record/2");
  });

  it("renders the correct link for the 'Más antiguos' button", () => {
    render(<PageNavigation currentPage={1} hasMorePosts={true} />, {
      wrapper: MemoryRouterProvider,
    });

    const moreLink = screen.getByRole("link", { name: "Más antiguos" });
    expect(moreLink).toHaveAttribute("href", "/record/2");
  });
});
