import { render, screen } from "@testing-library/react";
import StyledCheckbox from "./index";

describe("Checkbox", () => {
  it("should render the component and show the HTML", () => {
    render(<StyledCheckbox />);
    screen.debug(); // To output the component's HTML for debugging
  });
});
