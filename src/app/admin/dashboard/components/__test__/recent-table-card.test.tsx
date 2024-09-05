import { render, screen } from "@testing-library/react";
import React from "react";

import { RecentsTableCard } from "../recent-table-card";

describe("Testing RecentsTableCard Component", () => {
  it("renders the title and children correctly", () => {
    const title = "Recent News";
    const children = <div>Content goes here</div>;
    const fallback = <div>Loading...</div>;

    render(
      <RecentsTableCard title={title} fallback={fallback}>
        {children}
      </RecentsTableCard>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();

    expect(screen.getByText("Content goes here")).toBeInTheDocument();
  });
});
