import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import DeleteButton from "../delete-button";

jest.mock("next/navigation");

const mockRouter = {
  refresh: jest.fn(),
};

const mockHandleClearAll = jest.fn();

const mockContextValue = {
  selectedIds: [],
  handleCheckboxChange: jest.fn(),
  handleSelectAll: jest.fn(),
  handleClearAll: mockHandleClearAll,
};

const MockCheckboxContextProvider = ({ children }: { children: ReactNode }) => (
  <CheckboxContext.Provider value={mockContextValue}>
    {children}
  </CheckboxContext.Provider>
);

describe("Testing DeleteButton Component", () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it("should render the delete button", () => {
    render(
      <MockCheckboxContextProvider>
        <DeleteButton postId="1" onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should call onDelete when clicked", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <DeleteButton postId="1" onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith("1");
    });
  });

  it("should show loading state when deleting", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <DeleteButton postId="1" onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");

    // Simulates a click on the button
    fireEvent.click(button);

    // Waits for the button to be disabled
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it("should call handleClearAll after deletion", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <DeleteButton postId="1" onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleClearAll).toHaveBeenCalled();
    });
  });

  it("should handle error correctly", async () => {
    mockOnDelete.mockRejectedValue(new Error("Error occurred"));

    // Spies on the console.error function
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MockCheckboxContextProvider>
        <DeleteButton postId="1" onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Waits for handleClearAll to be called
    await waitFor(() => {
      expect(mockHandleClearAll).toHaveBeenCalled();
    });

    // Verifies that the button is enabled again
    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    // Verifies that console.error was called with the correct error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    // Restores the original implementation of console.error
    consoleErrorSpy.mockRestore();
  });
});
