import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SecondTagSection from "../second-tag-section";

const mockPosts = [
  {
    id: "1",
    title: "Sample Post 1",
    coverImage: "https://example.com/image1.jpg",
    slug: "sample-post-1",
    excerpt: null,
    tags: [{ name: "Tech" }],
    createdAt: new Date(),
    author: { id: "1", name: "Author 1", picture: "" },
  },
  {
    id: "2",
    title: "Sample Post 2",
    coverImage: "https://example.com/image2.jpg",
    slug: "sample-post-2",
    excerpt: null,
    tags: [{ name: "Health" }],
    createdAt: new Date(),
    author: { id: "2", name: "Author 2", picture: "" },
  },
];

describe("Testing SecondTagSection Component", () => {
  it("should render the SecondTagSection correctly", () => {
    render(
      <SecondTagSection secondMostUsedTag={["Tech"]} postsByTags={mockPosts} />,
    );

    const post1Elements = screen.getAllByText("Sample Post 1");
    expect(post1Elements[0]).toBeInTheDocument();
    const post2Elements = screen.getAllByText("Sample Post 2");
    expect(post2Elements[0]).toBeInTheDocument();

    const techTags = screen.getAllByText("Tech");
    expect(techTags[0]).toBeInTheDocument();
  });

  it("should navigate through posts on mobile", async () => {
    render(
      <SecondTagSection
        secondMostUsedTag={["Health"]}
        postsByTags={mockPosts}
      />,
    );

    // Verify that the first post is displayed initially
    const post1Elements = screen.getAllByText("Sample Post 1");
    expect(post1Elements[0]).toBeVisible(); // Make sure the first element is visible

    // Simulates clicking the "Next" button
    const nextButton = screen.getByLabelText("Siguiente tag");
    fireEvent.click(nextButton);

    // Wait for the second post to appear
    await waitFor(() => {
      const post2Elements = screen.getAllByText("Sample Post 2");
      expect(post2Elements[0]).toBeVisible(); // Make sure the second element is visible
    });

    // Simulates clicking on the "Previous" button
    const prevButton = screen.getByLabelText("Tag anterior");
    fireEvent.click(prevButton);

    // Wait for the first post to appear again
    await waitFor(() => {
      const post1ElementsAgain = screen.getAllByText("Sample Post 1");
      expect(post1ElementsAgain[0]).toBeVisible(); // Make sure the first element is visible again
    });
  });
});
