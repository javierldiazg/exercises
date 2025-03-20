import { renderHook, act } from "@testing-library/react";
import { useRef } from "react";
import { useRangeInputs } from "./useRangeInputs";

describe("useRangeInputs Hook", () => {
  const setup = (props = {}) => {
    const rangeRef = {
      current: { getBoundingClientRect: () => ({ left: 0, width: 200 }) },
    } as React.RefObject<HTMLDivElement>;
    const setMinValue = jest.fn();
    const setMaxValue = jest.fn();

    return renderHook(() =>
      useRangeInputs({
        min: 0,
        max: 100,
        minValue: 20,
        maxValue: 80,
        rangeRef,
        fixedValues: [10, 50, 90],
        setMinValue,
        setMaxValue,
        ...props,
      })
    );
  };

  it("initializes correctly", () => {
    const { result } = setup();

    expect(result.current.minInputValue).toBe("20.00");
    expect(result.current.maxInputValue).toBe("80.00");
    expect(result.current.showMinInput).toBe(false);
    expect(result.current.showMaxInput).toBe(false);
  });

  it("updates input values when minValue and maxValue change", () => {
    const { result, rerender } = setup({ minValue: 40, maxValue: 60 });

    act(() => {
      rerender({ minValue: 40, maxValue: 60 });
    });

    expect(result.current.minInputValue).toBe("40.00");
    expect(result.current.maxInputValue).toBe("60.00");
  });

  it("handles min input change correctly", () => {
    const { result } = setup();

    act(() => {
      result.current.handleMinInputChange({
        target: { value: "25.50" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.minInputValue).toBe("25.50");
  });

  it("handles max input change correctly", () => {
    const { result } = setup();

    act(() => {
      result.current.handleMaxInputChange({
        target: { value: "85.75" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.maxInputValue).toBe("85.75");
  });

  it("applies min value correctly", () => {
    const { result } = setup();

    act(() => {
      result.current.minInputValue = "30";
      result.current.handleInputBlur("min");
    });

    expect(result.current.showMinInput).toBe(false);
  });

  it("applies max value correctly", () => {
    const { result } = setup();

    act(() => {
      result.current.maxInputValue = "70";
      result.current.handleInputBlur("max");
    });

    expect(result.current.showMaxInput).toBe(false);
  });

  it("handles Enter key to apply min value", () => {
    const { result } = setup();

    act(() => {
      result.current.minInputValue = "35";
      result.current.handleKeyPress(
        { key: "Enter" } as React.KeyboardEvent,
        "min"
      );
    });

    expect(result.current.showMinInput).toBe(false);
  });

  it("handles Enter key to apply max value", () => {
    const { result } = setup();

    act(() => {
      result.current.maxInputValue = "75";
      result.current.handleKeyPress(
        { key: "Enter" } as React.KeyboardEvent,
        "max"
      );
    });

    expect(result.current.showMaxInput).toBe(false);
  });

  it("ignores other keys in handleKeyPress", () => {
    const { result } = setup();

    act(() => {
      result.current.handleKeyPress(
        { key: "Escape" } as React.KeyboardEvent,
        "min"
      );
    });

    expect(result.current.showMinInput).toBe(false);
  });
});
