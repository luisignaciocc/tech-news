import { render, screen } from "@testing-library/react";

import NotAprovedTable from "../notaproved-table";

const mockData = [
  {
    id: "1",
    title: "Not Approved Article 1",
  },
  {
    id: "2",
    title: "Not Approved Article 2",
  },
];

describe("Testing NotAprovedTable Component", () => {
  it("should render the table with data", () => {
    render(<NotAprovedTable data={mockData} />);

    expect(screen.getByText("Not Approved Article 1")).toBeInTheDocument();
    expect(screen.getByText("Not Approved Article 2")).toBeInTheDocument();
  });

  it("should render a message when there are no data", () => {
    render(<NotAprovedTable data={[]} />);

    expect(screen.getByText("No hay datos para mostrar")).toBeInTheDocument();
  });
});
