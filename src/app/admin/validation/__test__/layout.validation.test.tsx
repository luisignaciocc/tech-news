import { render, screen } from "@testing-library/react";

import Layout from "../layout";

describe("Testing Layout in /admin/validation", () => {
  it("renders the title and children correctly", () => {
    const childContent = <div>Child Content</div>;

    render(<Layout>{childContent}</Layout>);

    expect(screen.getByText("Validación")).toBeInTheDocument();

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
