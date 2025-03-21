import React from "react";
import styles from "./Range.module.css";

interface RangeTrackProps {
  rangeRef: React.RefObject<HTMLDivElement | null>;
  fixedValues?: number[];
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onHandleDragStart: (e: React.MouseEvent, type: "min" | "max") => void;
}

export const RangeTrack = ({
  rangeRef,
  fixedValues,
  min,
  max,
  minValue,
  maxValue,
  onHandleDragStart,
}: RangeTrackProps) => {
  return (
    <div ref={rangeRef} className={styles.rangeTrack}>
      {fixedValues &&
        fixedValues.map((value, index) => (
          <span
            key={index}
            className={styles.tick}
            style={{ left: `${((value - min) / (max - min)) * 100}%` }}
          >
            |
          </span>
        ))}

      <div
        className={styles.handle}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={minValue}
        style={{ left: `${((minValue - min) / (max - min)) * 100}%` }}
        onMouseDown={(e) => onHandleDragStart(e, "min")}
      />
      <div
        className={styles.handle}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={maxValue}
        style={{ left: `${((maxValue - min) / (max - min)) * 100}%` }}
        onMouseDown={(e) => onHandleDragStart(e, "max")}
      />
    </div>
  );
};
