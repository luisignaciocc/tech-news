import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";

import { Links, linksArray } from "../links";

describe("Testing Links Component", () => {
  it("should render all links correctly", () => {
    render(<Links />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);

    linksArray.forEach((link) => {
      const foundLink = screen.getByRole("link", { name: link.label });
      expect(foundLink).toHaveAttribute("href", link.href.replace(/\/$/, ""));
    });
  });
});
