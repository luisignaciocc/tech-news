import { render } from "@testing-library/react";
import { redirect } from "next/navigation";
import { FC } from "react";

import ValidationPage from "../page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Make sure ValidationPage is typed correctly
const MockValidationPage: FC = ValidationPage as FC;

describe("Testing ValidationPage in /admin/validation", () => {
  it("redirects to the correct page", () => {
    render(<MockValidationPage />);

    // Verify that redirect is called with the correct URL
    expect(redirect).toHaveBeenCalledWith("/admin/validation/topublish?page=1");
  });
});
