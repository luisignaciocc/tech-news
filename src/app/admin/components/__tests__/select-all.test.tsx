import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import React, { ReactNode } from "react";

import { CheckboxContext } from "../../context/checkbox-context";
import SelectAll from "../select-all";

// Context Mock
const mockHandleSelectAll = jest.fn();

// Defines the type for the context
const mockContextValue = {
  handleSelectAll: mockHandleSelectAll,
  selectedIds: [] as string[],
  handleCheckboxChange: jest.fn(),
  handleClearAll: jest.fn(),
};

// Mock context provider
const MockCheckboxContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <CheckboxContext.Provider value={mockContextValue}>
    {children}
  </CheckboxContext.Provider>
);

describe("Testing SelectAll Component", () => {
  const shownIds = ["1", "2", "3"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the checkbox and label", () => {
    render(
      <MockCheckboxContextProvider>
        <SelectAll shownIds={shownIds} />
      </MockCheckboxContextProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Seleccionar todo");

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("should check the checkbox if all shownIds are selected", () => {
    mockContextValue.selectedIds = ["1", "2", "3"]; // Simulate that everyone is selected

    render(
      <MockCheckboxContextProvider>
        <SelectAll shownIds={shownIds} />
      </MockCheckboxContextProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked(); // Checkbox should be checked
  });

  it("should call handleSelectAll with correct arguments when checkbox is toggled to checked", () => {
    mockContextValue.selectedIds = []; // Simulates that none are selected

    render(
      <MockCheckboxContextProvider>
        <SelectAll shownIds={shownIds} />
      </MockCheckboxContextProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox); // Simulate clicking on the checkbox

    expect(mockHandleSelectAll).toHaveBeenCalledWith(shownIds, true); // Must be called with true
  });

  it("should call handleSelectAll with correct arguments when checkbox is toggled to unchecked", () => {
    mockContextValue.selectedIds = ["1", "2", "3"]; // Simulate that everyone is selected

    render(
      <MockCheckboxContextProvider>
        <SelectAll shownIds={shownIds} />
      </MockCheckboxContextProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox); // Simulate clicking on the checkbox

    expect(mockHandleSelectAll).toHaveBeenCalledWith(shownIds, false); // Must be called with false
  });
});
