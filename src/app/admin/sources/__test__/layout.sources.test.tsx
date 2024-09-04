import { render, screen } from "@testing-library/react";

import Layout from "../layout";

describe("Testing Layout Component in /admin/sources", () => {
  it("should render the layout with the correct title and children", () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>,
    );

    expect(screen.getByText("Sources Registrados")).toBeInTheDocument();

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
