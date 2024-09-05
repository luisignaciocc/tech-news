import { render, screen } from "@testing-library/react";

import Layout from "../layout";

describe("Testing Layout Component in /admin/dashboard", () => {
  const postsContent = <div>Post Content</div>;
  const newsContent = <div>News Content</div>;

  it("renders the title and tabs correctly", () => {
    render(<Layout posts={postsContent} news={newsContent} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
  });

  it("shows posts content by default", () => {
    render(<Layout posts={postsContent} news={newsContent} />);

    expect(screen.getByText("Post Content")).toBeInTheDocument();
    expect(screen.queryByText("News Content")).not.toBeInTheDocument();
  });
});
