import { render, screen } from "@testing-library/react";

import Layout from "../layout";

describe("Testing Layout Component in /admin/posts", () => {
  it("should render the layout with the correct title", () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>,
    );

    expect(screen.getByText("Posts Publicados")).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>,
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
