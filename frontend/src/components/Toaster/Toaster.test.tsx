import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Toaster from "@/components/Toaster";
import { showToaster } from "@/store/toaster/module";

vi.mock("@/store/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock("@mui/material", () => ({
  Snackbar: ({ open, autoHideDuration, onClose, children }: any) => {
    return open ? (
      <div data-testid="mock-snackbar">
        {children}
        <button data-testid="close-snackbar" onClick={() => onClose({}, "close")}>
          Close
        </button>
      </div>
    ) : null;
  },
  Alert: ({ children }: any) => <div data-testid="mock-alert">{children}</div>
}));

describe("Toaster", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);
  });

  it("should not render when `isVisible` is false", () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      isVisible: false,
      message: "",
      severity: null,
      position: null
    });

    const { container } = render(<Toaster />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render the Snackbar and Alert when `isVisible` is true", () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      isVisible: true,
      message: "Test Message",
      severity: "success",
      position: { vertical: "top", horizontal: "right" }
    });

    render(<Toaster />);

    expect(screen.getByTestId("mock-snackbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert")).toHaveTextContent("Test Message");
  });

  it("should dispatch `showToaster(false)` when Snackbar is closed", async () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      isVisible: true,
      message: "Test Message",
      severity: "info",
      position: { vertical: "bottom", horizontal: "left" }
    });

    render(<Toaster />);

    fireEvent.click(screen.getByTestId("close-snackbar"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(showToaster(false));
    });
  });

  it("should not close the Snackbar on clickaway", async () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      isVisible: true,
      message: "Test Message",
      severity: "error",
      position: null
    });

    render(<Toaster />);

    const snackbar = screen.getByTestId("mock-snackbar");
    fireEvent.click(snackbar, { reason: "clickaway" });

    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
