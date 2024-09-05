import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import AddSource from "../add-source";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../utils/actions", () => ({
  createSource: jest.fn(),
}));

const MockCheckboxContextProvider = ({ children }: { children: ReactNode }) => (
  <CheckboxContext.Provider
    value={{
      selectedIds: [],
      handleCheckboxChange: jest.fn(),
      handleSelectAll: jest.fn(),
      handleClearAll: jest.fn(),
    }}
  >
    {children}
  </CheckboxContext.Provider>
);

describe("Testing AddSource Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should open modal on button click", () => {
    render(
      <MockCheckboxContextProvider>
        <AddSource />
      </MockCheckboxContextProvider>,
    );

    // Click the "Add Source" button
    fireEvent.click(screen.getByRole("button", { name: /add source/i }));

    // Verify that the modal is open using getByRole for the header
    expect(
      screen.getByRole("heading", { name: /add source/i }),
    ).toBeInTheDocument();
  });

  it("should validate fields and show errors", async () => {
    render(
      <MockCheckboxContextProvider>
        <AddSource />
      </MockCheckboxContextProvider>,
    );

    // Open the modal
    fireEvent.click(screen.getByRole("button", { name: /add source/i }));

    // Click the save button without filling out the fields
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // Verify that error messages are displayed
    expect(
      await screen.findByText("This field is required"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter a valid URL"),
    ).toBeInTheDocument();
  });
});
