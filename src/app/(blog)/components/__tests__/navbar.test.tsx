import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import NavBar from "../navbar";

jest.mock("next/navigation");

describe("Testing NavBar Component", () => {
  const mockTags = ["Tech", "News", "Tutorials"];
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null), // Simulate no search parameters
    });
  });

  it("should render the logo and tags correctly", () => {
    render(<NavBar isNavBar={true} tags={mockTags} />, {
      wrapper: MemoryRouterProvider,
    });

    const logos = screen.getAllByAltText("Logotipo de Tecnobuc");
    expect(logos.length).toBe(2); // Verify that there are exactly two logos

    mockTags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });
});
