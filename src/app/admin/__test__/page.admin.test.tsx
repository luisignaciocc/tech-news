import { render } from "@testing-library/react";
import { redirect } from "next/navigation";
import { FC } from "react";

import AdminPage from "../page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Make sure AdminPage is typed correctly
const MockAdminPage: FC = AdminPage as FC;

describe("Testing AdminPage in /admin", () => {
  it("redirects to the correct page", () => {
    render(<MockAdminPage />);

    // Verify that redirect is called with the correct URL
    expect(redirect).toHaveBeenCalledWith("/admin/dashboard");
  });
});
