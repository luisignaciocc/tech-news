import { render, screen } from "@testing-library/react";
import PageNavigation from "../page-navigation";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

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
    expect(moreButton).not.toBeDisabled();
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

    const volverLink = screen.getByText("Volver").closest("a");
    expect(volverLink).toHaveAttribute("href", "/record/2");
  });

  it("renders the correct link for the 'Más antiguos' button", () => {
    render(<PageNavigation currentPage={1} hasMorePosts={true} />, {
      wrapper: MemoryRouterProvider,
    });

    const moreLink = screen.getByText("Más antiguos").closest("a");
    expect(moreLink).toHaveAttribute("href", "/record/2");
  });
});
