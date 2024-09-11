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

describe("Testing PostContent Component", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    // Simulate a slug parameter for the test
    const slug = "las-aplicaciones-que-apple-desplaz-en-la-wwdc-2024"; // Place a valid slug
    cy.visit(`/posts/${slug}`); // Change this to your app URL
  });

  it("should render PostContentLoadigSkeleton elements correctly", () => {
    // Verifies that the main container is present
    cy.get("div.w-full.flex.flex-col.mx-auto") // Selector for the main container
      .should("exist"); // Checks that the container exists

    // Verifies that the PostHeaderSkeleton is rendered
    cy.get("div.mb-6") // Selector for the post header
      .should("exist"); // Checks that the header is present

    // Verifies that the PostBodySkeleton is rendered
    cy.get("div.text-gray-600.w-full") // Selector for the post body
      .should("exist"); // Checks that the body is present

    // Waits a bit more before verifying MoreTagsSkeleton
    cy.wait(1000);

    // Verifies that the MoreTagsSkeletons are rendered
    cy.get("div.flex.flex-wrap > div").should("have.length.gte", 1); // Verifies that there is at least one Skeleton
  });

  it("should render the main container in PostContent", () => {
    // Verifies that the main container is present
    cy.get("div.w-full.flex.flex-col.mx-auto").should("exist");
  });

  it("should render the PostHeader and its internal components", () => {
    // Verifies that the main container is present
    cy.get("div.mb-6").should("exist"); // For the CoverImage and tags

    // Verifies that CoverImage is rendered
    cy.get("img").should("exist"); // Verifies that the image is present

    // Verifies that the title is present
    cy.get("h1.text-4xl").should("exist");

    // Verifies that the excerpt is present
    cy.get("h2").should("exist");

    // Verifies that the tags are rendered (without verifying specific content)
    cy.get("div.text-red-600").should("exist"); // Verifies that the tags container exists
    cy.get("span").should("exist"); // Verifies that at least one tag is rendered

    // Verifies that the social media buttons component is rendered
    cy.get("div.hidden.lg\\:flex").should("exist"); // For the large screen version
    cy.get("div.flex.justify-start").should("exist"); // For the small screen version
  });

  it("should render the PostBody", () => {
    // Verifies that the PostBody is rendered
    cy.get("div.text-gray-600.w-full").should("exist"); // Verifies the body container
  });

  it("should render the MoreTags and their internal components", () => {
    // Verifies that the MoreTags container is rendered
    cy.get("div.flex.flex-wrap").should("exist");

    // Verifies that there is a link for each tag
    cy.get("div.flex.flex-wrap a").should("have.length.greaterThan", 0); // Ensures that there is at least one link
  });
});
