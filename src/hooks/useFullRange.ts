import { useState, useRef } from "react";

export function useFullRange(min: number, max: number, fixedValues?: number[]) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: React.MouseEvent, type: "min" | "max") => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!rangeRef.current) return;
      const rect = rangeRef.current.getBoundingClientRect();
      const percent = (moveEvent.clientX - rect.left) / rect.width;
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

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
