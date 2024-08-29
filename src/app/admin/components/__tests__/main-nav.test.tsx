import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";

import { linksArray } from "../links";
import { MainNav } from "../main-nav";

describe("Testing MainNav Component", () => {
  it("should render Links component correctly", () => {
    render(<MainNav />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);

    linksArray.forEach((link) => {
      const foundLink = screen.getByRole("link", { name: link.label });
      expect(foundLink).toHaveAttribute("href", link.href.replace(/\/$/, ""));
    });
  });

  it("should accept a className prop", () => {
    const className = "test-class";
    render(<MainNav className={className} />);

    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveClass(className);
  });
});
