import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Screen from "./";

// Mock the ScreenHeader and ScreenBody components
vi.mock("./components/ScreenHeader", () => ({
  default: ({ title }: { title: string }) => <header>{title}</header>
}));

vi.mock("./components/ScreenBody", () => ({
  default: ({
    children,
    stickyFooterComponent
  }: {
    children: React.ReactNode;
    stickyFooterComponent?: React.ReactNode;
  }) => (
    <main>
      {children}
      {stickyFooterComponent && <footer>{stickyFooterComponent}</footer>}
    </main>
  )
}));

describe("Screen Component", () => {
  it("renders ScreenHeader with the correct props", () => {
    render(
      <Screen
        headerProps={{ title: "Test Header" }}
        bodyProps={{}}
        children={<div>Test Body</div>}
      />
    );
    expect(screen.getByText("Test Header")).toBeInTheDocument();
  });

  it("renders children inside ScreenBody", () => {
    render(<Screen bodyProps={{}} children={<div>Test Body</div>} />);
    expect(screen.getByText("Test Body")).toBeInTheDocument();
  });

  it("renders postHeaderComponent when provided", () => {
    render(
      <Screen
        headerProps={{ title: "Test Header" }}
        postHeaderComponent={<div>Post Header</div>}
        bodyProps={{}}
        children={<div>Test Body</div>}
      />
    );
    expect(screen.getByText("Post Header")).toBeInTheDocument();
  });

  it("renders stickyFooterComponent when provided", () => {
    render(
      <Screen
        headerProps={{ title: "Test Header" }}
        stickyFooterComponent={<div>Sticky Footer</div>}
        bodyProps={{}}
        children={<div>Test Body</div>}
      />
    );
    expect(screen.getByText("Sticky Footer")).toBeInTheDocument();
  });

  it("does not render postHeaderComponent if not provided", () => {
    render(
      <Screen
        headerProps={{ title: "Test Header" }}
        bodyProps={{}}
        children={<div>Test Body</div>}
      />
    );
    expect(screen.queryByText("Post Header")).not.toBeInTheDocument();
  });

  it("does not render stickyFooterComponent if not provided", () => {
    render(
      <Screen
        headerProps={{ title: "Test Header" }}
        bodyProps={{}}
        children={<div>Test Body</div>}
      />
    );
    expect(screen.queryByText("Sticky Footer")).not.toBeInTheDocument();
  });
});
