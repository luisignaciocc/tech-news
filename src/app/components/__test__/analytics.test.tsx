import { render, screen } from "@testing-library/react";

import { Analytics } from "../analytics";

jest.mock("@vercel/analytics/react", () => ({
  Analytics: jest.fn(() => <div>Mock Vercel Analytics</div>),
}));

describe("Testing Analytics component", () => {
  it("renders VercelAnalytics component", () => {
    render(<Analytics />);

    expect(screen.getByText("Mock Vercel Analytics")).toBeInTheDocument();
  });
});
