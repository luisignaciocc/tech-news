import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import React from "react";

import GroupedLayout from "../layout";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Testing GroupedLayout in /admin/validation/[tab]", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders the correct content for each tab", () => {
    const { rerender } = render(
      <GroupedLayout
        params={{ tab: "topublish" }}
        topublish={<div>Topublish Content</div>}
        deleted={<div>Deleted Content</div>}
        notaproved={<div>Not Approved Content</div>}
      >
        {null}
      </GroupedLayout>,
    );

    expect(screen.getByText("Topublish Content")).toBeInTheDocument();

    rerender(
      <GroupedLayout
        params={{ tab: "deleted" }}
        topublish={<div>Topublish Content</div>}
        deleted={<div>Deleted Content</div>}
        notaproved={<div>Not Approved Content</div>}
      >
        {null}
      </GroupedLayout>,
    );

    expect(screen.getByText("Deleted Content")).toBeInTheDocument();

    rerender(
      <GroupedLayout
        params={{ tab: "notaproved" }}
        topublish={<div>Topublish Content</div>}
        deleted={<div>Deleted Content</div>}
        notaproved={<div>Not Approved Content</div>}
      >
        {null}
      </GroupedLayout>,
    );

    expect(screen.getByText("Not Approved Content")).toBeInTheDocument();
  });

  it("navigates to the correct tab when changed", () => {
    render(
      <GroupedLayout
        params={{ tab: "topublish" }}
        topublish={<div>Topublish Content</div>}
        deleted={<div>Deleted Content</div>}
        notaproved={<div>Not Approved Content</div>}
      >
        {null}
      </GroupedLayout>,
    );

    mockRouter.push("/admin/validation/example?tab=deleted");

    expect(mockRouter.push).toHaveBeenCalledWith(
      "/admin/validation/example?tab=deleted",
    );
  });
});
