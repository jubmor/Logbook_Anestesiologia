import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MobileActionMenu from "./MobileActionMenu";
import { ActionButtonType } from "..";

describe("MobileActionMenu", () => {
  const mockAction = vi.fn();

  const actions: ActionButtonType[] = [
    { startIcon: <span>First Icon</span>, onClick: mockAction, text: "First Action" },
    { startIcon: <span>Second Icon</span>, onClick: mockAction, text: "Second Action" },
    {
      startIcon: <span>Other Icon</span>,
      onClick: mockAction,
      text: "Other Action",
      disabled: false
    }
  ];

  it("renders first and second actions correctly", () => {
    render(<MobileActionMenu actions={actions} />);
    expect(screen.getByTestId("first-action")).toBeInTheDocument();
    expect(screen.getByTestId("second-action")).toBeInTheDocument();
  });

  it("opens the menu when the more button is clicked", async () => {
    render(<MobileActionMenu actions={actions} />);
    const moreButton = screen.getByLabelText("more");
    fireEvent.click(moreButton);
    await waitFor(() => {
      expect(screen.getByText("Other Action")).toBeInTheDocument();
    });
  });

  it("triggers the correct action when a menu item is clicked", async () => {
    render(<MobileActionMenu actions={actions} />);
    const moreButton = screen.getByLabelText("more");
    fireEvent.click(moreButton);

    const menuItem = screen.getByText("Other Action");
    fireEvent.click(menuItem);

    // Verify that the action's onClick was called
    await waitFor(() => {
      expect(mockAction).toHaveBeenCalled();
    });
  });
});
