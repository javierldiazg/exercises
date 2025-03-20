import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RangeTrack } from "./RangeTrack";

describe("RangeTrack Component", () => {
  const rangeRef = { current: document.createElement("div") };
  const defaultProps = {
    rangeRef,
    min: 0,
    max: 100,
    minValue: 20,
    maxValue: 80,
    onHandleDragStart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without fixed values", () => {
    render(<RangeTrack {...defaultProps} />);

    const handles = screen.getAllByRole("slider");
    expect(handles).toHaveLength(2);

    // Check handles have correct ARIA attributes
    expect(handles[0]).toHaveAttribute("aria-valuemin", "0");
    expect(handles[0]).toHaveAttribute("aria-valuemax", "100");
    expect(handles[0]).toHaveAttribute("aria-valuenow", "20");

    expect(handles[1]).toHaveAttribute("aria-valuemin", "0");
    expect(handles[1]).toHaveAttribute("aria-valuemax", "100");
    expect(handles[1]).toHaveAttribute("aria-valuenow", "80");
  });

  test("renders with fixed values", () => {
    const fixedValues = [0, 25, 50, 75, 100];
    render(<RangeTrack {...defaultProps} fixedValues={fixedValues} />);

    // Check ticks are rendered (one for each fixed value)
    expect(screen.getAllByText("|")).toHaveLength(5);
  });

  test("handles are positioned correctly based on values", () => {
    render(<RangeTrack {...defaultProps} />);

    const handles = screen.getAllByRole("slider");

    // Check the style attributes for position
    expect(handles[0].style.left).toBe("20%");
    expect(handles[1].style.left).toBe("80%");
  });

  test("calls onHandleDragStart with correct type when min handle is dragged", () => {
    render(<RangeTrack {...defaultProps} />);

    const handles = screen.getAllByRole("slider");
    fireEvent.mouseDown(handles[0]);

    expect(defaultProps.onHandleDragStart).toHaveBeenCalledWith(
      expect.anything(),
      "min"
    );
  });

  test("calls onHandleDragStart with correct type when max handle is dragged", () => {
    render(<RangeTrack {...defaultProps} />);

    const handles = screen.getAllByRole("slider");
    fireEvent.mouseDown(handles[1]);

    expect(defaultProps.onHandleDragStart).toHaveBeenCalledWith(
      expect.anything(),
      "max"
    );
  });
});
