import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ScreenHeader, { ActionButtonType } from "./";
import { useScreenWidth } from "@/hooks/useScreenWidth";

vi.mock("@/hooks/useScreenWidth", () => ({
  useScreenWidth: vi.fn(() => 800)
}));

vi.mock("./components/MobileActionMenu", () => ({
  default: () => <div>Mobile Action Menu</div>
}));

describe("ScreenHeader Component", () => {
  it("renders title and subtext correctly", () => {
    render(
      <MemoryRouter>
        <ScreenHeader title="Test Title" subtext="Test Subtext" />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtext")).toBeInTheDocument();
  });

  it("renders back button when not on main root", () => {
    render(
      <MemoryRouter initialEntries={["/some/path"]}>
        <ScreenHeader title="Test Title" />
      </MemoryRouter>
    );

    const backButton = screen.getByLabelText("more");
    expect(backButton).toBeInTheDocument();
  });

  it("does not render back button when on main root", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScreenHeader title="Test Title" />
      </MemoryRouter>
    );

    const backButton = screen.queryByLabelText("more");
    expect(backButton).not.toBeInTheDocument();
  });

  it("renders action buttons correctly", () => {
    const actions: ActionButtonType[] = [
      { onClick: vi.fn(), text: "Action 1" },
      { onClick: vi.fn(), text: "Action 2" }
    ];

    render(
      <MemoryRouter>
        <ScreenHeader title="Test Title" actions={actions} />
      </MemoryRouter>
    );

    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  it("calls action button onClick when clicked", () => {
    const actionClick = vi.fn();
    const actions: ActionButtonType[] = [{ onClick: actionClick, text: "Action 1" }];

    render(
      <MemoryRouter>
        <ScreenHeader title="Test Title" actions={actions} />
      </MemoryRouter>
    );

    const actionButton = screen.getByText("Action 1");
    expect(actionButton).toBeInTheDocument();
    fireEvent.click(actionButton);
    expect(actionClick).toHaveBeenCalled();
  });

  it("renders MobileActionMenu when screen width is less than 769px", () => {
    (useScreenWidth as jest.Mock).mockReturnValue(500);
    render(
      <MemoryRouter>
        <ScreenHeader title="Test Title" actions={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Mobile Action Menu")).toBeInTheDocument();
  });
});
