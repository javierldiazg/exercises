import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Range } from "./Range";

// Mock the hooks
jest.mock("../../hooks/useRange", () => ({
  useRange: jest.fn().mockImplementation((min, max, fixedValues) => ({
    minValue: min,
    maxValue: max,
    onDragStart: jest.fn(),
    rangeRef: { current: document.createElement("div") },
    setMinValue: jest.fn(),
    setMaxValue: jest.fn(),
  })),
}));

jest.mock("../../hooks/useRangeInputs", () => ({
  useRangeInputs: jest.fn().mockImplementation(({ min, max }) => ({
    showMinInput: false,
    setShowMinInput: jest.fn(),
    showMaxInput: false,
    setShowMaxInput: jest.fn(),
    minInputValue: min.toString(),
    maxInputValue: max.toString(),
    isDragging: false,
    setIsDragging: jest.fn(),
    handleMinInputChange: jest.fn(),
    handleMaxInputChange: jest.fn(),
    handleInputBlur: jest.fn(),
    handleKeyPress: jest.fn(),
  })),
}));

// Mock the Lucide React Euro icon
jest.mock("lucide-react", () => ({
  Euro: () => <span data-testid="euro-icon">€</span>,
}));

describe("Range Component", () => {
  const defaultProps = {
    min: 0,
    max: 100,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default props", () => {
    render(<Range {...defaultProps} />);

    // Check if the range labels are rendered
    expect(screen.getByText("0.00")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();

    // Check for range track
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  test("renders with fixed values", () => {
    const fixedValues = [0, 25, 50, 75, 100];
    render(<Range {...defaultProps} fixedValues={fixedValues} />);

    // We can't directly test for the tick marks since they're style-based
    // But we can check that the component renders
    expect(screen.getByText("0.00")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();
  });

  test("renders with inputs enabled", () => {
    const { useRangeInputs } = require("../../hooks/useRangeInputs");
    useRangeInputs.mockImplementation(
      ({ min, max }: { min: number; max: number }) => ({
        showMinInput: true,
        setShowMinInput: jest.fn(),
        showMaxInput: false,
        setShowMaxInput: jest.fn(),
        minInputValue: min.toString(),
        maxInputValue: max.toString(),
        isDragging: false,
        setIsDragging: jest.fn(),
        handleMinInputChange: jest.fn(),
        handleMaxInputChange: jest.fn(),
        handleInputBlur: jest.fn(),
        handleKeyPress: jest.fn(),
      })
    );

    render(<Range {...defaultProps} enableInputs={true} />);

    // Check if the min input is rendered
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();

    // Reset the implementation
    useRangeInputs.mockImplementation(
      ({ min, max }: { min: number; max: number }) => ({
        showMinInput: false,
        setShowMinInput: jest.fn(),
        showMaxInput: false,
        setShowMaxInput: jest.fn(),
        minInputValue: min.toString(),
        maxInputValue: max.toString(),
        isDragging: false,
        setIsDragging: jest.fn(),
        handleMinInputChange: jest.fn(),
        handleMaxInputChange: jest.fn(),
        handleInputBlur: jest.fn(),
        handleKeyPress: jest.fn(),
      })
    );
  });

  test("handles drag start", () => {
    const { useRangeInputs } = require("../../hooks/useRangeInputs");
    const { useRange } = require("../../hooks/useRange");

    const setIsDraggingMock = jest.fn();
    const setShowMinInputMock = jest.fn();
    const setShowMaxInputMock = jest.fn();
    const onDragStartMock = jest.fn();

    useRangeInputs.mockImplementation(() => ({
      showMinInput: false,
      setShowMinInput: setShowMinInputMock,
      showMaxInput: false,
      setShowMaxInput: setShowMaxInputMock,
      minInputValue: "0",
      maxInputValue: "100",
      isDragging: false,
      setIsDragging: setIsDraggingMock,
      handleMinInputChange: jest.fn(),
      handleMaxInputChange: jest.fn(),
      handleInputBlur: jest.fn(),
      handleKeyPress: jest.fn(),
    }));

    useRange.mockImplementation(() => ({
      minValue: 0,
      maxValue: 100,
      onDragStart: onDragStartMock,
      rangeRef: { current: document.createElement("div") },
      setMinValue: jest.fn(),
      setMaxValue: jest.fn(),
    }));

    render(<Range {...defaultProps} />);

    // Get handles
    const handles = screen.getAllByRole("slider");
    fireEvent.mouseDown(handles[0]); // min handle

    // Check if the drag start functions were called
    expect(setIsDraggingMock).toHaveBeenCalledWith(true);
    expect(setShowMinInputMock).toHaveBeenCalledWith(false);
    expect(setShowMaxInputMock).toHaveBeenCalledWith(false);
    expect(onDragStartMock).toHaveBeenCalled();

    // Simulate mouseup to end dragging
    fireEvent.mouseUp(document);

    // Reset mocks
    useRangeInputs.mockImplementation(
      ({ min, max }: { min: number; max: number }) => ({
        showMinInput: false,
        setShowMinInput: jest.fn(),
        showMaxInput: false,
        setShowMaxInput: jest.fn(),
        minInputValue: min.toString(),
        maxInputValue: max.toString(),
        isDragging: false,
        setIsDragging: jest.fn(),
        handleMinInputChange: jest.fn(),
        handleMaxInputChange: jest.fn(),
        handleInputBlur: jest.fn(),
        handleKeyPress: jest.fn(),
      })
    );
  });

  test("calls onChange when values change", async () => {
    const onChangeMock = jest.fn();
    const { useRange } = require("../../hooks/useRange");

    // Mock implementation that will trigger useEffect
    useRange.mockImplementation(() => ({
      minValue: 10, // Changed from default 0
      maxValue: 90, // Changed from default 100
      onDragStart: jest.fn(),
      rangeRef: { current: document.createElement("div") },
      setMinValue: jest.fn(),
      setMaxValue: jest.fn(),
    }));

    render(<Range {...defaultProps} onChange={onChangeMock} />);

    // Check if onChange was called with updated values
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith({ minValue: 10, maxValue: 90 });
    });

    // Reset mock
    useRange.mockImplementation(
      ({ min, max }: { min: number; max: number }) => ({
        minValue: min,
        maxValue: max,
        onDragStart: jest.fn(),
        rangeRef: { current: document.createElement("div") },
        setMinValue: jest.fn(),
        setMaxValue: jest.fn(),
      })
    );
  });
});
