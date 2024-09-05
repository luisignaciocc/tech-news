import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "../modal";

describe("Testing Modal Component", () => {
  it("should render children when open", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <h1>Modal Content</h1>
      </Modal>,
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should not be visible when closed", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <h1>Modal Content</h1>
      </Modal>,
    );

    // Verify that the modal is not visible
    expect(screen.getByRole("dialog")).toHaveClass("hidden"); // Verify that it has the class 'hidden'
  });

  it("should call onClose when the close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <button onClick={handleClose}>Close</button>
        <h1>Modal Content</h1>
      </Modal>,
    );

    // Simulates clicking the close button
    fireEvent.click(screen.getByText("Close"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
