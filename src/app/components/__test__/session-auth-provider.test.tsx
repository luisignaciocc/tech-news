import { render, screen } from "@testing-library/react";

import SessionAuthProvider from "../session-auth-provider";

jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-session-provider">{children}</div>
  ),
}));

describe("Testing SessionAuthProvider component", () => {
  it("renders children inside SessionProvider", () => {
    const childContent = <div>Child Content</div>;

    render(<SessionAuthProvider>{childContent}</SessionAuthProvider>);

    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-session-provider")).toBeInTheDocument();
  });
});
