import { useState, useRef } from "react";

export function useRange(min: number, max: number, fixedValues?: number[]) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: React.MouseEvent, type: "min" | "max") => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      const percent = (moveEvent.clientX - rect.left) / rect.width;
      let newValue = Math.round(min + percent * (max - min));

      if (fixedValues && fixedValues.length > 0) {
        newValue = fixedValues.reduce(
          (prev, curr) =>
            Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev,
          fixedValues[0]
        );
      }

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

  return { minValue, maxValue, onDragStart, rangeRef };
}
