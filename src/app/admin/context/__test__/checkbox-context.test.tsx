import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { CheckboxContext, CheckboxProvider } from "../checkbox-context";

// Test component that uses context
const TestComponent = () => {
  const { selectedIds, handleCheckboxChange, handleSelectAll, handleClearAll } =
    React.useContext(CheckboxContext);

  return (
    <>
      <button onClick={() => handleCheckboxChange("1", true)}>
        Select Item 1
      </button>
      <button onClick={() => handleCheckboxChange("1", false)}>
        Deselect Item 1
      </button>
      <button onClick={() => handleSelectAll(["1", "2", "3"], true)}>
        Select All
      </button>
      <button onClick={() => handleSelectAll(["1", "2", "3"], false)}>
        Deselect All
      </button>
      <button onClick={handleClearAll}>Clear All</button>
      <div data-testid="selected-ids">{selectedIds.join(", ")}</div>
    </>
  );
};

describe("Testing CheckboxProvider", () => {
  it("should add an id to selectedIds when checkbox is checked", () => {
    render(
      <CheckboxProvider>
        <TestComponent />
      </CheckboxProvider>,
    );

    fireEvent.click(screen.getByText("Select Item 1"));
    expect(screen.getByTestId("selected-ids")).toHaveTextContent("1");
  });

  it("should remove an id from selectedIds when checkbox is unchecked", () => {
    render(
      <CheckboxProvider>
        <TestComponent />
      </CheckboxProvider>,
    );

    fireEvent.click(screen.getByText("Select Item 1"));
    fireEvent.click(screen.getByText("Deselect Item 1"));
    expect(screen.getByTestId("selected-ids")).toHaveTextContent("");
  });

  it("should select all items", () => {
    render(
      <CheckboxProvider>
        <TestComponent />
      </CheckboxProvider>,
    );

    fireEvent.click(screen.getByText("Select All"));
    expect(screen.getByTestId("selected-ids")).toHaveTextContent("1, 2, 3");
  });

  it("should deselect all items", () => {
    render(
      <CheckboxProvider>
        <TestComponent />
      </CheckboxProvider>,
    );

    fireEvent.click(screen.getByText("Select All"));
    fireEvent.click(screen.getByText("Deselect All"));
    expect(screen.getByTestId("selected-ids")).toHaveTextContent("");
  });

  it("should clear all selected ids", () => {
    render(
      <CheckboxProvider>
        <TestComponent />
      </CheckboxProvider>,
    );

    fireEvent.click(screen.getByText("Select Item 1"));
    fireEvent.click(screen.getByText("Clear All"));
    expect(screen.getByTestId("selected-ids")).toHaveTextContent("");
  });
});
