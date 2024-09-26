import { render, screen } from "@testing-library/react";

import SocialMediaButtons, { socialMediaLinks } from "../social-media-buttons";

describe("Testing SocialMediaButtons component", () => {
  it("should render social media buttons correctly", () => {
    render(<SocialMediaButtons />);

    socialMediaLinks.forEach((socialMedia) => {
      const linkElements = screen.getAllByLabelText(
        `Link to ${socialMedia.name}`,
      );
      expect(linkElements.length).toBeGreaterThan(0); // Verify that at least one exists
      expect(linkElements[0]).toHaveAttribute("href", socialMedia.url);
    });
  });
});
