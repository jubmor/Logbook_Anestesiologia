import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StyledSelector from "./";
import React from "react";

vi.mock("../InputWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

const defaultProps = {
  value: "", // Start with an empty string for single select
  onChange: vi.fn(),
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ],
  label: "Test Selector",
  id: "test-select"
};

describe("StyledSelector", () => {
  it("should render the correct number of options", async () => {
    const { container } = render(<StyledSelector {...defaultProps} />);
    userEvent.click(screen.getByRole("combobox"));
    await waitFor(() => screen.getByText("Option 1"));
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });

  it("should display the placeholder when no option is selected", () => {
    render(<StyledSelector {...defaultProps} placeholder="Select an option" />);
    const inputElement = screen.getByRole("combobox");
    expect(inputElement).toHaveTextContent("Select an option");
  });

  it("should render the guideLine if provided and no error is present", () => {
    render(<StyledSelector {...defaultProps} guideLine="This is a guideline" />);
    expect(screen.getByText("This is a guideline")).toBeInTheDocument();
  });

  it("should not render the guideLine if errorText is present", () => {
    render(
      <StyledSelector
        {...defaultProps}
        error
        errorText="This field is required"
        guideLine="This is a guideline"
      />
    );
    expect(screen.queryByText("This is a guideline")).toBeNull();
  });
});
