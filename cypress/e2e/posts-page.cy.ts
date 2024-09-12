describe("Testing SearchPageSkeleton Component", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    const page = "2";

    // Visit the page that should include SearchPostContent
    cy.visit(`/record/${page}`); // Change this to your app URL
  });

  it("should show Skeletons before rendering the posts", () => {
    // Verifies that the main skeleton container exists
    cy.get("div.mt-10").should("exist");

    // Verifies that the skeleton title container exists
    cy.get("div.flex.items-center").should("exist");

    // Verifies that there are skeletons within the MoreStories container
    cy.get("div.w-full")
      .find("div.grid") // Finds the grid container where the MoreStoriesSkeleton are rendered
      .should("have.length.greaterThan", 0);

    // Verifies the main skeleton container
    cy.get("div.w-full").should("exist"); // Verifies that it exists

    // Verifies that the div with the class w-4/12 and hidden lg:block exists
    cy.get("div.w-4\\/12.hidden.lg\\:block").should("exist");
  });
});

describe("Testing MoreStories Component", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {});

  it("should show PostPreview when there are posts", () => {
    const page = "2"; // Change this as needed
    // Visit the page that should include the MoreStories component
    cy.visit(`/record/${page}`); // Change this to your app URL

    // Verifies that there is at least one PostPreview
    cy.get("section").within(() => {
      cy.get("div.grid > div").should("exist"); // Make sure there are divs within the grid

      // Verifies that each PostPreview has the correct properties
      cy.get("div.grid > div").each(($el) => {
        // Verifies that there is a title
        cy.wrap($el).find("h3").should("exist");

        // Verifies that there is a link to the post
        cy.wrap($el)
          .find("a")
          .should("have.attr", "href")
          .and("match", /\/posts\//);

        // Verifies that there is an image
        cy.wrap($el).find("img").should("exist");

        // Verifies that there is a summary
        cy.wrap($el).find("p").should("exist");
      });
    });
  });

  it("should show the message when there are no posts", () => {
    // Simulates the condition where there are no posts
    cy.visit(`/record/999999999999`); // Make sure this page does not have posts

    // Verifies that the div with the message is displayed correctly
    cy.get("div.bg-gray-900.text-white").within(() => {
      cy.get("p").contains("No hay mas publicaciones.").should("exist"); // Verifies that the message exists
    });
  });
});
