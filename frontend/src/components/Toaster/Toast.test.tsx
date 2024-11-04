import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import toasterReducer, { toasterProps } from "@/store/features/toaster/module";
import Toaster from "./";

const defaultInitialState: toasterProps = {
  toaster: {
    isVisible: false,
    message: "",
    severity: "info",
    position: { vertical: "top", horizontal: "right" }
  }
};

const renderWithStore = (initialState: toasterProps = defaultInitialState) => {
  const store = configureStore({
    reducer: { toast: toasterReducer },
    preloadedState: { toast: initialState }
  });
  return {
    ...render(
      <Provider store={store}>
        <Toaster />
      </Provider>
    ),
    store
  };
};

describe("Toaster Component", () => {
  test("does not render when isVisible is false", () => {
    renderWithStore({ toaster: { ...defaultInitialState.toaster, isVisible: false } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("renders with correct message and severity when isVisible is true", () => {
    renderWithStore({
      toaster: {
        ...defaultInitialState.toaster,
        isVisible: true,
        message: "Test Message",
        severity: "error"
      }
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Test Message");
    expect(alert).toHaveClass("MuiAlert-standardError");
  });

  test("does not close Snackbar if clickaway is the reason for close", () => {
    const { store } = renderWithStore({
      toaster: { ...defaultInitialState.toaster, isVisible: true }
    });

    fireEvent.click(document.body, { reason: "clickaway" });
    expect(store.getState().toast.toaster.isVisible).toBe(true);
  });

  test("dispatches showToaster(false) when close icon is clicked", () => {
    const { store } = renderWithStore({
      toaster: { ...defaultInitialState.toaster, isVisible: true }
    });

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(store.getState().toast.toaster.isVisible).toBe(false);
  });
});
