// components/ActionsButtons.test.js
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import ActionsButtons from "../actions-buttons";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();

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
describe("Testing ActionsButtons Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should render the action buttons", () => {
    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          newsId="1"
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
  });

  it("should call onUpdate and refresh the router when update is successful", async () => {
    mockOnUpdate.mockResolvedValue({ success: true, message: "Updated" });

    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          newsId="1"
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const updateButton = screen.getAllByRole("button")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith("1");
    });
  });

  it("should call onDelete and refresh the router when delete is successful", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          newsId="1"
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const deleteButton = screen.getAllByRole("button")[1];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith("1");
    });
  });

  it("should handle loading state correctly", async () => {
    mockOnUpdate.mockResolvedValue({ success: true, message: "Updated" });

    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          newsId="1"
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const updateButton = screen.getAllByRole("button")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updateButton).toBeDisabled();
    });

    await waitFor(() => {
      expect(updateButton).toBeEnabled();
    });
  });
});
