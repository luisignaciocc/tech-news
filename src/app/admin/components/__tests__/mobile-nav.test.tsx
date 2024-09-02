import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { linksArray } from "../links";
import MobileNav from "../mobile-nav";

jest.mock("next/navigation");

global.ResizeObserver = class {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

Element.prototype.scrollIntoView = jest.fn();

describe("Testing MobileNav Component", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue("/admin/dashboard/");
  });

  it("should render the selected link and open the popover", () => {
    render(<MobileNav />);

    const button = screen.getByRole("combobox");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(linksArray[0].label);

    fireEvent.click(button);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
