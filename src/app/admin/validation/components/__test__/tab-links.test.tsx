import { render, screen } from "@testing-library/react";

import TabLinks from "../tab-links";

describe("TabLinks", () => {
  it("renders the correct links with the active tab", () => {
    const { rerender } = render(<TabLinks tab="topublish" />);

    // Verify that the "To Publish" link is active
    expect(screen.getByText("To Publish")).toHaveClass("bg-white text-black");
    expect(screen.getByText("Deleted")).toHaveClass("text-white");
    expect(screen.getByText("Not Aproved")).toHaveClass("text-white");

    // Switch to the "deleted" tab
    rerender(<TabLinks tab="deleted" />);

    // Verify that the "Deleted" link is active
    expect(screen.getByText("To Publish")).toHaveClass("text-white");
    expect(screen.getByText("Deleted")).toHaveClass("bg-white text-black");
    expect(screen.getByText("Not Aproved")).toHaveClass("text-white");

    // Switch to the "notaproved" tab
    rerender(<TabLinks tab="notaproved" />);

    // Verify that the "Not Approved" link is active
    expect(screen.getByText("To Publish")).toHaveClass("text-white");
    expect(screen.getByText("Deleted")).toHaveClass("text-white");
    expect(screen.getByText("Not Aproved")).toHaveClass("bg-white text-black");
  });
});
