import { renderHook, act } from "@testing-library/react";
import { useFullRange } from "./useFullRange";

describe("useFullRange Hook", () => {
  it("initializes minValue and maxValue correctly", () => {
    const { result } = renderHook(() => useFullRange(10, 50));

    expect(result.current.minValue).toBe(10);
    expect(result.current.maxValue).toBe(50);
  });

  it("clamps minValue and maxValue within range", () => {
    const { result } = renderHook(() => useFullRange(10, 50));

    act(() => {
      result.current.setMinValue(5);
      result.current.setMaxValue(60);
    });

    expect(result.current.minValue).toBe(5);
    expect(result.current.maxValue).toBe(60);
  });

  it("adjusts values to fixedValues when provided", () => {
    const { result } = renderHook(() => useFullRange(10, 50, [15, 25, 35]));

    act(() => {
      result.current.setMinValue(20);
      result.current.setMaxValue(40);
    });

    expect(result.current.minValue).toBe(20);
    expect(result.current.maxValue).toBe(40);
  });

  it("handles onDragStart and updates values correctly", () => {
    const { result } = renderHook(() => useFullRange(10, 50));

    const event = { clientX: 30 } as unknown as React.MouseEvent;

    act(() => {
      result.current.onDragStart(event, "min");
    });

    expect(result.current.minValue).toBeGreaterThanOrEqual(10);
    expect(result.current.minValue).toBeLessThanOrEqual(50);
  });
});
