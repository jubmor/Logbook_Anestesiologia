import { render, screen, fireEvent } from "@testing-library/react";
import MenuItem from "../MenuItem"; // Adjust this import based on your structure
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi } from "vitest";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { toggleDrawer } from "@/store/drawerMenu/module";
import { useAppDispatch } from "@/store/hooks";

describe("MenuItem Component", () => {
  const mockItem = {
    path: "/home",
    displayName: "Home",
    Icon: () => <span>🏠</span>,
    name: "home",
    element: <div>Home</div>
  };

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <MenuItem item={mockItem} />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("🏠")).toBeInTheDocument();
  });

  it('applies "active" class when location matches path', () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <MenuItem item={mockItem} />
      </MemoryRouter>
    );

    const optionContainer = screen.getByText("Home").closest("div");
    expect(optionContainer).toHaveClass("active");
  });

  it("dispatches toggleDrawer and navigates on click (mobile screen width)", () => {
    const mockNavigate = vi.fn();
    const mockDispatch = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useScreenWidth).mockReturnValue(400);

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <MenuItem item={mockItem} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Home"));

    expect(mockNavigate).toHaveBeenCalledWith("/home");
    expect(mockDispatch).toHaveBeenCalledWith(toggleDrawer());
  });

  it("does not dispatch toggleDrawer on click (desktop screen width)", () => {
    const mockNavigate = vi.fn();
    const mockDispatch = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useScreenWidth).mockReturnValue(1024);

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <MenuItem item={mockItem} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Home"));

    expect(mockNavigate).toHaveBeenCalledWith("/home");
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
