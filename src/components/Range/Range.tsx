"use client";

import { useEffect } from "react";
import styles from "./Range.module.css";
import { RangeProps } from "./types";
import { useRange } from "@/hooks/useRange";

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
      <span className={styles.label}>{minValue}</span>
      <div ref={rangeRef} className={styles.rangeTrack}>
        <div
          className={styles.handle}
          style={{ left: `${(minValue / max) * 100}%` }}
          onMouseDown={(e) => onDragStart(e, "min")}
        />
        <div
          className={styles.handle}
          style={{ left: `${(maxValue / max) * 100}%` }}
          onMouseDown={(e) => onDragStart(e, "max")}
        />
      </div>
      <span className={styles.label}>{maxValue}</span>
    </div>
  );
}
