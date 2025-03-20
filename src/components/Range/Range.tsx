"use client";

import { useEffect } from "react";
import { Euro } from "lucide-react";
import { useRange } from "@/hooks/useRange";
import { RangeProps } from "./types";
import styles from "./Range.module.css";

export function Range({ min, max, fixedValues, onChange }: RangeProps) {
  const { minValue, maxValue, onDragStart, rangeRef } = useRange(
    min,
    max,
    fixedValues
  );

  useEffect(() => {
    onChange({ minValue, maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <div className={styles.rangeContainer}>
      <span className={styles.label}>
        {minValue.toFixed(2)} <Euro size={16} />
      </span>
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
          onMouseDown={(e) => onDragStart(e, "min")}
        />
        <div
          className={styles.handle}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          style={{ left: `${((maxValue - min) / (max - min)) * 100}%` }}
          onMouseDown={(e) => onDragStart(e, "max")}
        />
      </div>
      <span className={styles.label}>
        {maxValue.toFixed(2)} <Euro size={16} />
      </span>
    </div>
  );
}
