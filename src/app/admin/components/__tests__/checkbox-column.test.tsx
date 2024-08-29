import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React, { ReactNode } from "react";

import { CheckboxContext } from "../../context/checkbox-context";
import { CheckboxColumn } from "../checkbox-column";

// Context Mock
const mockHandleCheckboxChange = jest.fn();
const mockHandleSelectAll = jest.fn();
const mockHandleClearAll = jest.fn();

// Define el tipo para el contexto
const mockContextValue: {
  handleCheckboxChange: (id: string, checked: boolean) => void;
  selectedIds: string[];
  handleSelectAll: (ids: string[], checked: boolean) => void;
  handleClearAll: () => void;
} = {
  handleCheckboxChange: mockHandleCheckboxChange,
  selectedIds: [],
  handleSelectAll: mockHandleSelectAll,
  handleClearAll: mockHandleClearAll,
};

// Define el tipo para los props del proveedor
const MockCheckboxContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <CheckboxContext.Provider value={mockContextValue}>
    {children}
  </CheckboxContext.Provider>
);

describe("Testing CheckboxColumn Component", () => {
  const id = "test-checkbox-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render checkbox and be unchecked initially", () => {
    render(
      <MockCheckboxContextProvider>
        <CheckboxColumn id={id} />
      </MockCheckboxContextProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked(); // Checkbox should not be checked
  });

  it("should call handleCheckboxChange when checkbox is clicked", () => {
    // Set the context with a selected ID
    mockContextValue.selectedIds = [id];

    render(
      <MockCheckboxContextProvider>
        <CheckboxColumn id={id} />
      </MockCheckboxContextProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked(); // Checkbox should be checked

    checkbox.click(); // Simulates clicking on the checkbox

    expect(mockHandleCheckboxChange).toHaveBeenCalledWith(id, false); // Should call with false
  });

  it("should call handleCheckboxChange when checkbox is unchecked", () => {
    // Set context without ID selected
    mockContextValue.selectedIds = [];

    render(
      <MockCheckboxContextProvider>
        <CheckboxColumn id={id} />
      </MockCheckboxContextProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked(); // Checkbox should not be checked

    checkbox.click(); // Simulates clicking on the checkbox

    expect(mockHandleCheckboxChange).toHaveBeenCalledWith(id, true); // Should call with true
  });
});
