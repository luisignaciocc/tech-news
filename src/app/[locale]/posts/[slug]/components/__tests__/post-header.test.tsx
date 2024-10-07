import { render, screen } from "@testing-library/react";

import { PostHeader } from "../post-header";

describe("Testing PostHeader component", () => {
  it("should render the post header correctly", () => {
    const date = new Date("2023-08-27");
    const tags = [{ id: 1, name: "TAG1" }];
    render(
      <PostHeader
        title="Test Post"
        coverImage="/test.jpg"
        date={date}
        tags={tags}
        excerpt="This is a test excerpt"
        locale={"es"}
      />,
    );

    expect(screen.getByText("TAG1")).toBeInTheDocument();
    expect(screen.getByText("This is a test excerpt")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Cover Image for Test Post/i }),
    ).toBeInTheDocument();
  });
});
