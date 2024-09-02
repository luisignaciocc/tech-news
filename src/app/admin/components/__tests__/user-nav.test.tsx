import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { UserNav } from "../user-nav";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

describe("Testing UserNav Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the user's initials when session is available", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "John Doe",
          email: "john@example.com",
        },
      },
    });

    render(<UserNav />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders 'NT' when there is no user name in the session", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "",
          email: "john@example.com",
        },
      },
    });

    render(<UserNav />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("NT")).toBeInTheDocument();
  });

  it("displays the user's name and email in the dropdown menu", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "Jane Doe",
          email: "jane@example.com",
        },
      },
    });

    render(<UserNav />, {
      wrapper: MemoryRouterProvider,
    });

    fireEvent.click(screen.getByRole("button", { name: "JD" }));

    await waitFor(() => {
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });
});
