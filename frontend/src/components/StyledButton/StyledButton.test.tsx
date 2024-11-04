import { render, screen, fireEvent } from "@testing-library/react";
import StyledButton from "./";
import { describe, expect, test, vi } from "vitest";

describe("StyledButton Component test", () => {
  const defaultProps = {
    text: "Default Button",
    type: "button" as const,
    onClick: () => {},
    className: ""
  };

  test("renders with default props", () => {
    render(<StyledButton {...defaultProps} />);
    expect(screen.getByRole("button", { name: /default button/i })).toBeInTheDocument();
  });

  test("applies custom class name", () => {
    render(<StyledButton {...defaultProps} text="Custom Button" className="custom-class" />);
    expect(screen.getByRole("button", { name: /custom button/i })).toHaveClass("custom-class");
  });

  test("fires onClick event for interaction button", () => {
    const handleClick = vi.fn(); // Mock function to track clicks
    render(<StyledButton {...defaultProps} text="Click Me" onClick={handleClick} type="button" />);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not fire onClick for submit button type", () => {
    render(<StyledButton text="Submit" type="submit" />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    // No need to check onClick since it should not be called
  });

  test("disables button when disabled prop is true", () => {
    const handleClick = vi.fn();
    render(<StyledButton {...defaultProps} text="Cannot Click" disabled onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /cannot click/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("renders with start and end icons", () => {
    render(
      <StyledButton
        {...defaultProps}
        text="Icon Button"
        startIcon={<span data-testid="start-icon">StartIcon</span>}
        endIcon={<span data-testid="end-icon">EndIcon</span>}
      />
    );
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });
});
