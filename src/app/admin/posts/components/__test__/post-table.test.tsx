import "@testing-library/jest-dom";

import { render, screen, within } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CheckboxContext } from "@/app/admin/context/checkbox-context";

import PostsTable from "../posts-table";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
  })),
}));

jest.mock("../../utils/actions", () => ({
  deletedPostUpdateNews: jest.fn(),
  deletedPostUpdateNewsMany: jest.fn(),
}));

const mockData = [
  {
    id: "1",
    title: "Post 1",
    coverImage: "https://via.placeholder.com/60",
    newId: "news1",
  },
  {
    id: "2",
    title: "Post 2",
    coverImage: "https://via.placeholder.com/60",
    newId: "news2",
  },
];

const mockContextValue: {
  selectedIds: string[];
  handleCheckboxChange: jest.Mock;
  handleSelectAll: jest.Mock;
  handleClearAll: jest.Mock;
} = {
  selectedIds: [],
  handleCheckboxChange: jest.fn(),
  handleSelectAll: jest.fn(),
  handleClearAll: jest.fn(),
};

const MockCheckboxContextProvider = ({ children }: { children: ReactNode }) => (
  <CheckboxContext.Provider value={mockContextValue}>
    {children}
  </CheckboxContext.Provider>
);

describe("Testing PostsTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      refresh: jest.fn(),
    }));
  });

  it("should render the table with posts data", () => {
    render(
      <MockCheckboxContextProvider>
        <PostsTable data={mockData} />
      </MockCheckboxContextProvider>,
    );

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();

    const post1Cell = screen.getByRole("cell", { name: /Post 1/i });
    const post1Image = within(post1Cell).getByAltText("");

    const post2Cell = screen.getByRole("cell", { name: /Post 2/i });
    const post2Image = within(post2Cell).getByAltText("");

    expect(post1Image).toHaveAttribute(
      "src",
      expect.stringContaining("via.placeholder.com"),
    );
    expect(post2Image).toHaveAttribute(
      "src",
      expect.stringContaining("via.placeholder.com"),
    );
  });

  it("should show a message when there are no posts", () => {
    render(
      <MockCheckboxContextProvider>
        <PostsTable data={[]} />
      </MockCheckboxContextProvider>,
    );

    expect(screen.getByText("No hay datos para mostrar")).toBeInTheDocument();
  });
});
