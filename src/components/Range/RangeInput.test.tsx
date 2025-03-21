import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RangeInput } from "./RangeInput";

// Mock the Lucide React Euro icon
jest.mock("lucide-react", () => ({
  Euro: () => <span data-testid="euro-icon">€</span>,
}));

describe("RangeInput Component", () => {
  const defaultProps = {
    value: "50",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onKeyPress: jest.fn(),
    min: 0,
    max: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct value", () => {
    render(<RangeInput {...defaultProps} />);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(50);
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(screen.getByTestId("euro-icon")).toBeInTheDocument();
  });

  test("calls onChange when value changes", () => {
    render(<RangeInput {...defaultProps} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "75" } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test("calls onBlur when input loses focus", () => {
    render(<RangeInput {...defaultProps} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.blur(input);

    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  test("calls onKeyPress when a key is pressed", () => {
    render(<RangeInput {...defaultProps} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(defaultProps.onKeyPress).toHaveBeenCalled();
  });

  test("has autofocus when enabled", () => {
    render(<RangeInput {...defaultProps} autoFocus={true} />);

    const input = screen.getByRole("spinbutton");
    expect(document.activeElement).toBe(input);
  });
});
