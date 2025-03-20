import { renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRange } from "./useRange";

describe("useRange Hook", () => {
  it("initializes with correct min and max values", () => {
    const { result } = renderHook(() => useRange(1, 100));

    expect(result.current.minValue).toBe(1);
    expect(result.current.maxValue).toBe(100);
  });

  it("does not allow minValue to be greater than maxValue", () => {
    const { result } = renderHook(() => useRange(1, 100));

    act(() => {
      result.current.onDragStart({ clientX: 9999 } as React.MouseEvent, "min");
    });

    expect(result.current.minValue).toBeLessThan(result.current.maxValue);
  });

  it("selects nearest fixed value when dragging", () => {
    const { result } = renderHook(() =>
      useRange(1.99, 70.99, [1.99, 5.99, 10.99])
    );

    act(() => {
      result.current.onDragStart({ clientX: 50 } as React.MouseEvent, "min");
    });

    expect([1.99, 5.99, 10.99]).toContain(result.current.minValue);
  });

  it("handles drag events correctly", () => {
    const { result } = renderHook(() => useRange(1, 100));

    act(() => {
      result.current.onDragStart({ clientX: 50 } as React.MouseEvent, "min");
    });

    act(() => {
      const moveEvent = new MouseEvent("mousemove", { clientX: 75 });
      document.dispatchEvent(moveEvent);
    });

    act(() => {
      const upEvent = new MouseEvent("mouseup");
      document.dispatchEvent(upEvent);
    });

    expect(result.current.minValue).toBeGreaterThanOrEqual(1);
    expect(result.current.maxValue).toBeLessThanOrEqual(100);
  });

  it("removes event listeners after drag", () => {
    const { result } = renderHook(() => useRange(1, 100));

    const removeEventListenerMock = jest.spyOn(document, "removeEventListener");

    act(() => {
      result.current.onDragStart({ clientX: 50 } as React.MouseEvent, "min");
    });

    act(() => {
      const upEvent = new MouseEvent("mouseup");
      document.dispatchEvent(upEvent);
    });

    expect(removeEventListenerMock).toHaveBeenCalledTimes(2);
  });
});
