import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InputWrapper from "./";

describe("InputWrapper Component", () => {
  it("renders children correctly", () => {
    render(
      <InputWrapper label="Test Label" required={true} extraClass="custom-class">
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(
      <InputWrapper label="Test Label" required={true}>
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders required indicator when required is true", () => {
    render(
      <InputWrapper label="Test Label" required={true}>
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not render required indicator when required is false", () => {
    render(
      <InputWrapper label="Test Label" required={false}>
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders tooltip when provided", () => {
    render(
      <InputWrapper label="Test Label" tooltip="Test tooltip" required={true}>
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.getByTitle("Test tooltip")).toBeInTheDocument();
  });

  it("renders error message when error is true", () => {
    render(
      <InputWrapper label="Test Label" error={true} errorText="Test error message">
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("does not render error message when error is false", () => {
    render(
      <InputWrapper label="Test Label" error={false} errorText="Test error message">
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.queryByText("Test error message")).not.toBeInTheDocument();
  });

  it("applies extra class if provided", () => {
    render(
      <InputWrapper label="Test Label" extraClass="custom-class">
        <input placeholder="Test input" />
      </InputWrapper>
    );
    expect(screen.getByPlaceholderText("Test input").parentElement).toHaveClass("custom-class");
  });
});
