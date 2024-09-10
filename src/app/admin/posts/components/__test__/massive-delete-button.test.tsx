import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import MassiveDeleteButton from "../massive-delete-button";

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

describe("Testing MassiveDeleteButton Component", () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it("should render the massive delete button", () => {
    render(
      <MockCheckboxContextProvider>
        <MassiveDeleteButton postsIds={["1", "2"]} onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should call onDelete when clicked", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <MassiveDeleteButton postsIds={["1", "2"]} onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(["1", "2"]);
    });
  });

  it("should show loading state when deleting", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <MassiveDeleteButton postsIds={["1", "2"]} onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Wait for the button to be disabled
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it("should call handleClearAll after deletion", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <MassiveDeleteButton postsIds={["1", "2"]} onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleClearAll).toHaveBeenCalled();
    });
  });

  it("should handle error correctly", async () => {
    // Simulate that the onDelete function rejects the promise
    mockOnDelete.mockRejectedValue(new Error("Error occurred"));

    // Spy on the console.error function
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MockCheckboxContextProvider>
        <MassiveDeleteButton postsIds={["1", "2"]} onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");

    // Simulate clicking the button
    fireEvent.click(button);

    // Wait for handleClearAll to be called
    await waitFor(() => {
      expect(mockHandleClearAll).toHaveBeenCalled();
    });

    // Wait for the button to be enabled again
    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    // Verify that console.error was called with the correct error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    // Restore the original implementation of console.error
    consoleErrorSpy.mockRestore();
  });

  it("should refresh the router on successful delete", async () => {
    mockOnDelete.mockResolvedValue({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <MassiveDeleteButton postsIds={["1", "2"]} onDelete={mockOnDelete} />
      </MockCheckboxContextProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });
});
