import { render, screen } from "@testing-library/react";

import GroupedLayout from "../layout";

jest.mock("../components/nav-bar", () => {
  const MockNavBar = () => <div>Mock NavBar</div>;
  MockNavBar.displayName = "MockNavBar";
  return MockNavBar;
});

jest.mock("../../components/session-auth-provider", () => {
  const MockSessionAuthProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>;
  MockSessionAuthProvider.displayName = "MockSessionAuthProvider";
  return MockSessionAuthProvider;
});

describe("Testing GroupedLayout in /admin", () => {
  it("renders NavBar and children correctly", () => {
    const childContent = <div>Child Content</div>;

    render(<GroupedLayout>{childContent}</GroupedLayout>);

    // Verifica que el NavBar se renderiza correctamente
    expect(screen.getByText("Mock NavBar")).toBeInTheDocument();

    // Verifica que los hijos se renderizan correctamente
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
