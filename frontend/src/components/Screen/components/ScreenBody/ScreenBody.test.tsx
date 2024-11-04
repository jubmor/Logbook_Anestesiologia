import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ScreenBody from "./";

describe("ScreenBody Component", () => {
  it("renders children correctly", () => {
    render(
      <ScreenBody bodyProps={{}}>
        <div>Test Child</div>
      </ScreenBody>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders stickyFooterComponent when provided", () => {
    render(
      <ScreenBody stickyFooterComponent={<div>Sticky Footer</div>} bodyProps={{}}>
        <div>Test Child</div>
      </ScreenBody>
    );
    expect(screen.getByText("Sticky Footer")).toBeInTheDocument();
  });

  it("does not render stickyFooterComponent if not provided", () => {
    render(
      <ScreenBody bodyProps={{}}>
        <div>Test Child</div>
      </ScreenBody>
    );
    expect(screen.queryByText("Sticky Footer")).not.toBeInTheDocument();
  });
});
