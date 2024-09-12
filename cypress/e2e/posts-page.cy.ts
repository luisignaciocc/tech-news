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

describe("Testing SideSection Component", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    const page = "2";
    // Visit the page that should include SearchPostContent
    cy.visit(`/record/${page}`); // Change this to your app URL
  });

  it("should render the SideSection component", () => {
    // Verifies that the div containing SideSection is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").should("exist");
  });

  it("should render the SpecialSectionSkeleton component", () => {
    // Verifies that the fallback of SpecialSectionSkeleton is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      cy.get("h2").should("exist"); // Verifies that the header is present
      cy.get("div").should("have.length.greaterThan", 0); // Verifies that there is at least one div representing the content
    });
  });

  it("should render the elements of the SpecialCardPost component within SpecialSection", () => {
    // Verifies that the SpecialSection component is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      cy.get("h2").contains("Especiales").should("exist");

      // Verifies that there is at least one SpecialCardPost
      cy.get("div.relative.flex.flex-col").should("have.length.greaterThan", 0);

      // Verifies that each SpecialCardPost has the necessary elements
      cy.get("div.relative.flex.flex-col").each(() => {
        // Verifies that there is an image
        cy.get("img").should("exist");

        // Verifies that the link has a slug
        cy.get("a")
          .should("have.attr", "href")
          .and("match", /\/posts\//);

        // Verifies that there is a number
        cy.get(
          "div.absolute.bottom-2.left-4.text-white.text-2xl.font-bold",
        ).should("exist");

        // Verifies that there is a title
        cy.get("h3").should("exist");
      });
    });
  });

  it("should render the TagSectionSkeleton component", () => {
    // Verifies that the fallback of TagSectionSkeleton is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      // Verifies that there is a header
      cy.get("h2").should("exist"); // Verifies that the header is present

      // Verifies that there are at least three divs representing the content
      cy.get("div").should("have.length.greaterThan", 0); // Ensures there is at least one div in the section

      // Verifies that there is at least one div representing a Skeleton
      cy.get("div").find("div").should("exist"); // Ensures there is a div representing a Skeleton
    });
  });

  it("should render the TagSection component and its elements", () => {
    // Verifies that the TagSection component is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      // Verifies that there is a header
      cy.get("h2").should("exist"); // Verifies that the header is present

      // Verifies that there is at least one div representing the content
      cy.get("div.mb-7").should("have.length.greaterThan", 0); // Ensures there is at least one PostPreview

      // Verifies that each PostPreview has the necessary elements
      cy.get("div.mb-7").each(() => {
        // Verifies that there is an image
        cy.get("img").should("exist");

        // Verifies that there is a link for the title
        cy.get("h3 a")
          .should("have.attr", "href")
          .and("match", /\/posts\//);

        // Verifies that there is a tag
        cy.get("a.uppercase.text-gray-800").should("exist");

        // Verifies that there is a date
        cy.get("div.text-gray-500").should("exist");
      });
    });
  });

  it("should render the PostCarouselSkeleton component", () => {
    // Verifies that the fallback of PostCarouselSkeleton is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      // Verifies that there is a Skeleton
      cy.get("div").find("div").should("exist"); // Ensures there is a div representing the Skeleton

      // Verifies that there is a horizontal line
      cy.get("hr").should("exist"); // Checks that there is a horizontal line
    });
  });

  it("should render the PostsCarouselFetcher component and its elements", () => {
    // Verifies that the PostsCarouselFetcher component is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      // Verifies that there is a carousel
      cy.get("div.relative.w-full.h-56.mt-4.overflow-hidden").should("exist");

      // Verifies that there is at least one post in the carousel
      cy.get("div.relative.w-full.h-52").should("have.length.greaterThan", 0); // Ensures there is at least one Post in the carousel

      // Verifies that each Post has an image and a link
      cy.get("div.relative.w-full.h-52").each(() => {
        // Verifies that there is an image
        cy.get("img").should("exist");

        // Verifies that there is a link for the title
        cy.get("a")
          .should("have.attr", "href")
          .and("match", /\/posts\//);
      });

      // Verifies that there are indicators for the carousel
      cy.get("div.absolute.top-2.right-2.flex.space-x-2").should("exist");
    });
  });

  it("should render the MiniFooterSkeleton component", () => {
    // Verifies that the fallback of MiniFooterSkeleton is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      // Verifies that there is a section of skeletons
      cy.get("div.flex.justify-center").should("exist"); // Checks that the icon section is present

      // Verifies that there are at least four skeletons for the icons
      cy.get("div.relative.group").should("have.length.greaterThan", 0); // Ensures there is at least one icon

      // Verifies that there are skeletons for the text
      cy.get("div.flex.flex-col").should("exist"); // Checks that the text section is present

      // Verifies that there is at least one skeleton for the text
      cy.get("div.flex.flex-col")
        .find("div")
        .should("have.length.greaterThan", 0); // Ensures there is at least one skeleton for the text
    });
  });

  it("should render the MiniFooter component and its elements", () => {
    // Verifies that the MiniFooter component is present
    cy.get("div.w-4\\/12.hidden.lg\\:block").within(() => {
      // Verifies that there are social media links
      cy.get("div.flex.items-start").should("exist"); // Checks that the links section is present

      // Verifies that there is at least one link
      cy.get("a").should("have.length.greaterThan", 0); // Ensures there is at least one social media link

      // Verifies that there is an information text
      cy.get("span.uppercase.text-sm").should("exist"); // Checks that there is information text

      // Verifies that there is a logo
      cy.get("div.w-10.h-10").should("exist"); // Checks that there is a div containing the logo

      // Verifies that there is a text containing "Hecho por"
      cy.contains("Hecho por").should("exist"); // Ensures the text "Hecho por" is present
    });
  });
});
