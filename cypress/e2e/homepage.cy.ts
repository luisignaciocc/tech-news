import * as api from "../../src/lib/api";

describe("Testing Intro Component", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should load the Intro component and its skeleton", () => {
    // Verify that the skeleton is initially displayed
    cy.get("section").eq(0).find("div").should("exist"); // Check the first section with the skeleton

    // Wait a while to simulate data loading
    cy.wait(1000);

    // Verify that the second section with DashboardTagsFetcher is rendered
    cy.get("section").eq(1).find("div").should("exist"); // Check the second section
  });

  it("should show items inside the DashboardTagsFetcher and activate the navbar", () => {
    // Wait a while to simulate data loading
    cy.wait(1000);

    // Verify that the DashboardTagsFetcher is rendered
    cy.get("section").eq(1).should("exist"); // Check the second section

    // Simulates scrolling down
    cy.scrollTo(0, 150); // Scroll down 150px

    // Verify that the navbar div is displayed after scrolling
    cy.get("div.fixed").should("be.visible"); // Verify that the navbar div is displayed

    // Verify that the labels within the NavBar are present
    cy.get("div.fixed").find("a").should("have.length.greaterThan", 0); // Make sure there are links
  });
});

describe("Testing HeadlinePosts Component", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Visit the main page before each test
  });

  it("should display the HeadlinePosts skeleton while loading", () => {
    // Verify that the loading skeleton is present
    cy.get(".flex.flex-wrap.justify-center")
      .find("div") // Find all divs within the container
      .should("have.length.greaterThan", 5); // Verify that there are more than 5 divs in the skeleton
    cy.wait(1000); // Wait for the data to load
  });

  it("should display HeadlinePosts after loading", () => {
    // Simulate the function to return mock data
    cy.stub(api, "getRandomPostsFromTwoWeeksAgo").returns(
      Promise.resolve([
        { slug: "post-1", title: "Post 1" },
        { slug: "post-2", title: "Post 2" },
        { slug: "post-3", title: "Post 3" },
        { slug: "post-4", title: "Post 4" },
        { slug: "post-5", title: "Post 5" },
        { slug: "post-6", title: "Post 6" },
        { slug: "post-7", title: "Post 7" },
        { slug: "post-8", title: "Post 8" },
      ]),
    );

    // Verify that the posts are displayed
    cy.get(".flex.flex-wrap.justify-center").find("a").should("have.length", 8); // Make sure there are 8 links to the posts
  });
});

describe("Testing HeroPostsFetcher, PostVerticalCarouselSkeleton and PostVerticalCarousel Components", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should display PostVerticalCarouselSkeleton while loading", () => {
    // Wait a moment for the data to load
    cy.wait(2000); // Increase wait time if necessary

    // Verify that the container where the skeleton should be rendered is present
    cy.get(".flex.gap-8.mt-2").should("exist");

    // Verify that the .w-full container is present
    cy.get(".flex.gap-8.mt-2").find(".w-full").should("exist"); // Verify that the .w-full container exists

    // Verify that there is at least one div inside .w-full
    cy.get(".flex.gap-8.mt-2")
      .find(".w-full")
      .find("div") // Find all divs inside the container
      .should("have.length.greaterThan", 0); // Make sure there is at least one div

    // If needed, you can add a log for debugging
    cy.get(".flex.gap-8.mt-2")
      .find(".w-full")
      .invoke("html")
      .then((html) => {
        cy.log(html); // Show the current HTML in the Cypress console
      });
  });

  it("should display posts after loading", () => {
    // Wait for the data to load
    cy.get(".flex.gap-8.mt-2", { timeout: 10000 }) // Adjust timeout as needed
      .find("h3.text-2xl.leading-tight.tracking-tighter")
      .should("have.length.greaterThan", 0); // Verify that there is at least one h3

    // Optional: Verify that there are at least two h3 elements
    cy.get(".flex.gap-8.mt-2")
      .find("h3.text-2xl.leading-tight.tracking-tighter")
      .should("have.length.greaterThan", 1); // Adjust according to what you expect
  });
});

describe("Testing MoreStoriesSkeleton and MoreStories Components", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should render the skeleton", () => {
    // Verify that skeleton elements are present
    cy.get("section")
      .find("div.grid > div", { timeout: 10000 }) // Adjust timeout if necessary
      .should("exist"); // Check that at least one element is present
  });

  it("should render posts correctly", () => {
    // Verify that posts are rendered
    cy.get("section")
      .find("div.grid > div", { timeout: 10000 }) // Adjust this according to the actual structure of rendered posts
      .should("exist"); // Verify that at least one post is present
  });
});

describe("Testing SecondTagSectionSkeleton and SecondTagSection Components", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should render the skeletons", () => {
    // Verify that skeleton elements are present
    cy.get("div.hidden.lg\\:block") // Make sure this class is correct
      .find("div.flex") // Select the divs containing the skeletons
      .should("exist"); // Check that at least one skeleton is present
  });

  it("should render the elements correctly", () => {
    // Verify that SecondTagSection elements are present
    cy.get("div.hidden.lg\\:block") // Selector for desktop version
      .find("div.flex") // Select the container of the posts
      .should("exist"); // Check that the container is present

    cy.get("div.mb-8.block.lg\\:hidden") // Selector for mobile version
      .find("div.carousel") // Select the carousel container
      .should("exist"); // Check that the carousel is present
  });
});

describe("Testing SpecialSectionSkeleton and SpecialSection Components", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should render the skeletons", () => {
    // Verify that the main container of SpecialSectionSkeleton is present
    cy.get("h2.text-3xl.uppercase.font-bold") // Selector for the title
      .should("exist"); // Check that the title is present

    // Verify that there is at least one skeleton container
    cy.get("div.relative.flex.flex-col.items-start") // Selector for the skeleton containers
      .should("exist"); // Check that at least one is present
  });

  it("should render the elements correctly", () => {
    // Verify that the section title is present
    cy.get("h2.text-3xl.uppercase.font-bold") // Selector for the title
      .should("exist"); // Check that the title is present

    // Verify that there is at least one special post container
    cy.get("div.relative.flex.flex-col.items-start") // Selector for the post containers
      .should("exist"); // Check that at least one is present
  });
});

describe("Testing TagSectionSkeleton and TagSection Components", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should render the skeletons", () => {
    // Verify that the section title is present
    cy.get("h2.text-3xl.uppercase.font-bold") // Selector for the title
      .should("exist"); // Check that the title is present

    // Verify that there is at least one skeleton container
    cy.get("div.mt-5") // Selector for the main container
      .find("div") // Select all divs inside the container
      .should("have.length.greaterThan", 0); // Check that there is at least one div
  });

  it("should render the elements correctly", () => {
    // Verify that the section title is present
    cy.get("h2.text-3xl.uppercase") // Selector for the title
      .should("exist"); // Check that the title is present

    // Verify that there is at least one post container
    cy.get("div.mb-7") // Selector for the post containers
      .should("exist"); // Check that at least one is present
  });
});

describe("Testing PostCarouselSkeleton and PostCarousel Components", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should render the skeletons", () => {
    // Verify that the skeleton container is present
    cy.get("div.mt-10") // Selector for the skeleton container
      .should("exist"); // Check that the container exists

    // Verify that the horizontal line is present
    cy.get("hr.mt-4.w-full") // Selector for the horizontal line
      .should("exist"); // Check that the line is present
  });

  it("should render the elements correctly", () => {
    // Verify that the PostCarousel component is present
    cy.get("div") // Adjust the selector as needed for your structure
      .should("exist"); // Check that the carousel container is present

    // Verify that there is at least one post in the carousel
    cy.get("div.mb-7") // Selector for the post containers within the carousel
      .should("exist"); // Check that at least one is present
  });
});

describe("Testing MiniFooterSkeleton and MiniFooter Components", () => {
  before(() => {
    cy.viewport(1280, 720); // Set the screen resolution once
  });

  beforeEach(() => {
    cy.visit("/"); // Change this to your app URL
  });

  it("should render the skeletons", () => {
    // Verify that the main container is present
    cy.get("div.mt-6") // Selector for the main container
      .should("exist"); // Check that the container exists

    // Verify that there is at least one skeleton container
    cy.get("div.flex.justify-center.gap-4") // Selector for the skeleton containers
      .should("exist"); // Check that at least one is present

    // Verify that there is at least one skeleton in the bottom section
    cy.get("div.flex.flex-col.justify-center.items-center") // Selector for the bottom section
      .should("exist"); // Check that at least one is present
  });

  it("should render the elements correctly", () => {
    // Verify that the main container is present
    cy.get("div.mt-6") // Selector for the main container
      .should("exist"); // Check that the container exists

    // Verify that the social media links section is present
    cy.get("div.flex.justify-center.gap-4") // Selector for the social media links
      .should("exist"); // Check that at least one is present

    // Verify that the copyright section is present
    cy.get("span.uppercase.text-sm") // Selector for the copyright text
      .should("exist"); // Check that the text is present

    // Verify that the image is present
    cy.get("div.w-10.h-10") // Selector for the image container
      .should("exist"); // Check that the image container is present
  });
});
