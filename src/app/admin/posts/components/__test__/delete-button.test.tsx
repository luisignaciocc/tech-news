import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import DeleteButton from "../delete-button"; // Ajusta la ruta según tu estructura

// Mock del useRouter
jest.mock("next/navigation");

const mockRouter = {
  refresh: jest.fn(),
};

const mockHandleClearAll = jest.fn();

// Contexto Mock
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
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
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
    fireEvent.click(button);

    expect(button).toBeDisabled(); // Verificar que el botón esté desactivado
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

    await waitFor(() => {
      expect(button).toBeEnabled(); // Verifica que el botón se re-habilite después de un error
    });
  });
});
