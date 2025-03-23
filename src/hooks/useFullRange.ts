import { useState, useRef } from "react";

export function useFullRange(min: number, max: number, fixedValues?: number[]) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, type: "min" | "max") => {
    if (!rangeRef.current) return;
    const rect = rangeRef.current.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    let newValue = min + percent * (max - min);

    if (fixedValues?.length) {
      newValue = fixedValues.reduce((prev, curr) =>
        Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
      );
    }

    newValue = Math.max(min, Math.min(newValue, max));

    if (type === "min") setMinValue(Math.min(newValue, maxValue - 1));
    if (type === "max") setMaxValue(Math.max(newValue, minValue + 1));
  };

  const onDragStart = (
    event: React.MouseEvent | React.TouchEvent,
    type: "min" | "max"
  ) => {
    const isTouch = "touches" in event;
    const startX = isTouch
      ? event.touches[0].clientX
      : (event as React.MouseEvent).clientX;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveX =
        "touches" in moveEvent
          ? moveEvent.touches[0].clientX
          : (moveEvent as MouseEvent).clientX;
      handleMove(moveX, type);
    };

    const onEnd = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);

    handleMove(startX, type);
  };

  return {
    minValue,
    maxValue,
    onDragStart,
    rangeRef,
    setMinValue,
    setMaxValue,
  };
}
