// components/SourcesTable.test.js
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import SourcesTable from "../sources-table";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../utils/actions", () => ({
  consultSource: jest.fn(),
  deleteSource: jest.fn(),
  updateStatus: jest.fn(),
}));

const mockData = [
  {
    id: 1,
    name: "Source 1",
    lastUpdateAt: new Date("2023-09-01T12:00:00Z"),
    isActive: true,
    newsCount: 5,
  },
  {
    id: 2,
    name: "Source 2",
    lastUpdateAt: new Date("2023-09-02T12:00:00Z"),
    isActive: false,
    newsCount: 2,
  },
];

const mockNewsCount = [
  { id: 1, newsCount: 5 },
  { id: 2, newsCount: 2 },
];

describe("Testing SourcesTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      refresh: jest.fn(),
    });
  });

  it("should render sources when data is provided", () => {
    render(<SourcesTable data={mockData} newsCount={mockNewsCount} />);

    expect(screen.getByText("Source 1")).toBeInTheDocument();
    expect(screen.getByText("Source 2")).toBeInTheDocument();

    // expect(screen.getByText("1/9/2023, 8:00:00 a. m.")).toBeInTheDocument();
    // expect(screen.getByText("2/9/2023, 8:00:00 a. m.")).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    const activeElements = screen.getAllByText("Active");
    const inactiveElements = screen.getAllByText("Inactive");

    expect(activeElements.length).toBeGreaterThan(0);
    expect(inactiveElements.length).toBeGreaterThan(0);
  });

  it("should render a message when there are no sources", () => {
    render(<SourcesTable data={[]} newsCount={[]} />);

    expect(screen.getByText("No hay datos para mostrar")).toBeInTheDocument();
  });
});
