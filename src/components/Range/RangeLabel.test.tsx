import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RangeLabel } from "./RangeLabel";

// Mock the Lucide React Euro icon
jest.mock("lucide-react", () => ({
  Euro: () => <span data-testid="euro-icon">€</span>,
}));

describe("RangeLabel Component", () => {
  const defaultProps = {
    value: 50,
    onClick: jest.fn(),
    clickable: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct value", () => {
    render(<RangeLabel {...defaultProps} />);

    expect(screen.getByText("50.00")).toBeInTheDocument();
    expect(screen.getByTestId("euro-icon")).toBeInTheDocument();
  });

  test("formats value with two decimal places", () => {
    render(<RangeLabel {...defaultProps} value={75.5} />);

    expect(screen.getByText("75.50")).toBeInTheDocument();
  });

  test("does not call onClick when not clickable", () => {
    render(<RangeLabel {...defaultProps} />);

    const label = screen.getByText("50.00");
    fireEvent.click(label);

    if (defaultProps.clickable) {
      expect(defaultProps.onClick).toHaveBeenCalled();
    } else {
      expect(defaultProps.onClick).not.toHaveBeenCalled();
    }
  });

  test("calls onClick when clickable", () => {
    render(<RangeLabel {...defaultProps} clickable={true} />);

    const label = screen.getByText("50.00");
    fireEvent.click(label);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test("has clickable class when clickable", () => {
    const { container } = render(
      <RangeLabel {...defaultProps} clickable={true} />
    );

    // Since we can't directly access the class names, we need to check the container
    expect(container.firstChild).toHaveClass("clickable");
  });
});
