import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import DeletedTable from "../deleted-table";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../utils/actions", () => ({
  deleteNews: jest.fn(),
  deleteNewsMany: jest.fn(),
  updateDeletedAtNull: jest.fn(),
  updateDeletedAtNullMany: jest.fn(),
}));

const mockData = [
  {
    id: "1",
    title: "News Article 1",
    deletionReason: "Duplicate",
  },
  {
    id: "2",
    title: "News Article 2",
    deletionReason: "Obsolete",
  },
];

const mockSelectedIds = ["1", "2"];

const mockContextValue = {
  selectedIds: mockSelectedIds,
  handleCheckboxChange: jest.fn(),
  handleSelectAll: jest.fn(),
  handleClearAll: jest.fn(),
};

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <CheckboxContext.Provider value={mockContextValue}>
      {component}
    </CheckboxContext.Provider>,
  );
};

describe("Testing DeletedTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should render the table with data", () => {
    renderWithContext(<DeletedTable data={mockData} />);

    expect(screen.getByText("News Article 1")).toBeInTheDocument();
    expect(screen.getByText("News Article 2")).toBeInTheDocument();

    expect(screen.getByText("Duplicate")).toBeInTheDocument();
    expect(screen.getByText("Obsolete")).toBeInTheDocument();
  });

  it("should render a message when there are no data", () => {
    renderWithContext(<DeletedTable data={[]} />);

    expect(screen.getByText("No hay datos para mostrar")).toBeInTheDocument();
  });
});
