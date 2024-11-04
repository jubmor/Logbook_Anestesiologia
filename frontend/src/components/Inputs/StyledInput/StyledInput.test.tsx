import { render, screen, fireEvent } from "@testing-library/react";
import StyledInput, { Props } from "./";
import { describe, it, expect, vi } from "vitest";

describe("StyledInput Component", () => {
  const baseProps: Props = {
    id: "test-input",
    type: "text",
    label: "Test Label",
    value: "",
    onChange: vi.fn()
  };

  it("renders with given label and placeholder", () => {
    render(<StyledInput {...baseProps} />);
    const input = screen.getByLabelText("Test Label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Test Label");
  });

  it("applies the disabled attribute correctly", () => {
    render(<StyledInput {...baseProps} disabled={true} />);
    const input = screen.getByLabelText("Test Label");
    expect(input).toBeDisabled();
  });

  it("renders password toggle button and toggles password visibility", () => {
    render(<StyledInput {...baseProps} type="password" />);
    const toggleButton = screen.getByLabelText("toggle password visibility");
    expect(toggleButton).toBeInTheDocument();

    // Default state should be password type
    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("type", "password");

    // Click to toggle visibility
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders with custom placeholder when provided", () => {
    render(<StyledInput {...baseProps} placeholder="Custom Placeholder" />);
    const input = screen.getByPlaceholderText("Custom Placeholder");
    expect(input).toBeInTheDocument();
  });

  it("applies autoComplete attribute correctly", () => {
    render(<StyledInput {...baseProps} autoComplete="email" />);
    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("autocomplete", "email");
  });

  it("calls onChange handler when input value changes", () => {
    render(<StyledInput {...baseProps} />);
    const input = screen.getByLabelText("Test Label");
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(baseProps.onChange).toHaveBeenCalled();
  });
});
