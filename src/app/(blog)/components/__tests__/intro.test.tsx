import { render, screen } from "@testing-library/react";

import { Intro } from "../intro";

// DashboardTagsFetcher Component Mock
jest.mock("../dashboard-tags-fetcher", () => {
  const MockedComponent = () => (
    <div role="navigation">Mocked DashboardNavBar</div>
  );
  MockedComponent.displayName = "MockedDashboardTagsFetcher";
  return MockedComponent;
});

describe("Testing Intro component", () => {
  it("should render the Intro component correctly", () => {
    render(<Intro />);

    // Verify that the mock component renders
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
