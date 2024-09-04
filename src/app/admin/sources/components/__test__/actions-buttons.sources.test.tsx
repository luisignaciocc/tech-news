import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import ActionsButtons from "../actions-buttons";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../utils/actions", () => ({
  updateNewsSource: jest.fn(),
}));

const mockOnEdit = jest.fn();
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

  it("should render the actions buttons", () => {
    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          sourceId={1}
          onEdit={mockOnEdit}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(3);

    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[2]).toBeInTheDocument();
  });

  it("should open modal on edit button click", async () => {
    mockOnEdit.mockResolvedValueOnce({
      success: true,
      data: {
        id: 1,
        name: "Sample Source",
        url: "https://example.com",
        lastUpdateAt: new Date(),
        isActive: true,
      },
      message: "Success",
    });

    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          sourceId={1}
          onEdit={mockOnEdit}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const editButton = screen.getAllByRole("button")[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Edit Source")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("Sample Source");
    });

    await waitFor(() => {
      expect(screen.getByLabelText("URL")).toHaveValue("https://example.com");
    });
  });

  it("should call update function on save", async () => {
    mockOnEdit.mockResolvedValueOnce({
      success: true,
      data: {
        id: 1,
        name: "Sample Source",
        url: "https://example.com",
        lastUpdateAt: new Date(),
        isActive: true,
      },
      message: "Success",
    });
    mockOnUpdate.mockResolvedValueOnce({ success: true, message: "Updated" });

    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          sourceId={1}
          onEdit={mockOnEdit}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const editButton = screen.getAllByRole("button")[0];
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated Source" },
    });

    fireEvent.change(screen.getByLabelText("URL"), {
      target: { value: "https://updated.com" },
    });

    const saveButton = screen.getAllByRole("button")[1];
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(1);
    });
  });

  it("should call delete function on delete button click", async () => {
    mockOnDelete.mockResolvedValueOnce({ success: true, message: "Deleted" });

    render(
      <MockCheckboxContextProvider>
        <ActionsButtons
          sourceId={1}
          onEdit={mockOnEdit}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      </MockCheckboxContextProvider>,
    );

    const deleteButton = screen.getAllByRole("button")[2];

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
  });
});
