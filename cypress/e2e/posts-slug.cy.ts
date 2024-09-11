describe("Testing HeaderPost Component", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  it("should render HeaderPostLoadingSkeleton elements correctly", () => {
    cy.visit("/");

    // Verifies that the main container is present
    cy.get("div.flex.flex-wrap.justify-center") // Selector for the main container
      .should("exist"); // Checks that the container exists

    // Verifies that there is at least one skeleton element
    cy.get("div.w-full") // Selector for the PostCardLoadingSkeleton containers
      .should("exist"); // Checks that at least one is present
  });

  it("should render HeaderPosts elements correctly", () => {
    // Simulate a slug parameter for the test
    const slug = "cuidado-te-enamorars-de-dewalt-con-este-taladro-de-99"; // Place a valid slug

    // Visit the post page using the simulated slug
    cy.visit(`/posts/${slug}`);

    // Verifies that the main container of HeaderPosts is present
    cy.get("div.flex.flex-wrap.justify-center") // Selector for the HeaderPosts container
      .should("exist"); // Checks that the container exists

    // Verifies that at least one PostCard is rendered
    cy.get("div.relative.flex") // Selector for the PostCard containers
      .should("exist"); // Checks that at least one is present
  });

  it("should render PostCard elements correctly", () => {
    // Simulate a slug parameter for the test
    const slug = "cuidado-te-enamorars-de-dewalt-con-este-taladro-de-99"; // Place a valid slug

    cy.visit(`/posts/${slug}`);

    // Verifies that the post image is present
    cy.get("img") // Selector for the image
      .should("exist"); // Checks that the image is present

    // Verifies that the title is present
    cy.get("h3") // Selector for the title
      .should("exist"); // Checks that the title is present

    // Verifies that at least one tag is present
    cy.get("p.text-red-600") // Selector for the tags
      .should("exist"); // Checks that the tags are present
  });
});
