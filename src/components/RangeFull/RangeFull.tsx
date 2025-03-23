"use client";

import { useEffect, useState } from "react";
import { Euro } from "lucide-react";
import { useFullRange } from "@/hooks/useFullRange";
import { RangeProps } from "../../utils/types";
import styles from "./RangeFull.module.css";

export function RangeFull({
  min,
  max,
  fixedValues,
  onChange,
  enableInputs = false,
}: RangeProps) {
  const {
    minValue,
    maxValue,
    onDragStart,
    rangeRef,
    setMinValue,
    setMaxValue,
  } = useFullRange(min, max, fixedValues);

  const [showMinInput, setShowMinInput] = useState(false);
  const [showMaxInput, setShowMaxInput] = useState(false);
  const [minInputValue, setMinInputValue] = useState(minValue.toFixed(2));
  const [maxInputValue, setMaxInputValue] = useState(maxValue.toFixed(2));
  const [isDragging] = useState(false);

  useEffect(() => {
    setMinInputValue(minValue.toFixed(2));
    setMaxInputValue(maxValue.toFixed(2));
  }, [minValue, maxValue]);

  useEffect(() => {
    onChange({ minValue, maxValue });
  }, [minValue, maxValue, onChange]);

  const handleBlur = (type: "min" | "max") => {
    if (type === "min") {
      setMinValue(parseFloat(minInputValue) || min);
      setShowMinInput(false);
    } else {
      setMaxValue(parseFloat(maxInputValue) || max);
      setShowMaxInput(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: "min" | "max") => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur(type);
    }
  };

  return (
    <div className={styles.rangeContainer}>
      <div className={styles.inputContainer}>
        {enableInputs && showMinInput && !isDragging ? (
          <input
            type="number"
            value={minInputValue}
            onChange={(e) => setMinInputValue(e.target.value)}
            onBlur={() => handleBlur("min")}
            onKeyDown={(e) => handleKeyDown(e, "min")}
            className={styles.valueInput}
            autoFocus
          />
        ) : (
          <span
            className={`${styles.label} ${
              enableInputs ? styles.clickable : ""
            }`}
            onClick={() => enableInputs && !isDragging && setShowMinInput(true)}
          >
            {minValue.toFixed(2)} <Euro size={16} />
          </span>
        )}
      </div>

      <div ref={rangeRef} className={styles.rangeTrack}>
        <div
          className={styles.handle}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minValue}
          style={{ left: `${((minValue - min) / (max - min)) * 100}%` }}
          onMouseDown={(e) => onDragStart(e, "min")}
          onTouchStart={(e) => onDragStart(e, "min")}
        />
        <div
          className={styles.handle}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          style={{ left: `${((maxValue - min) / (max - min)) * 100}%` }}
          onMouseDown={(e) => onDragStart(e, "max")}
          onTouchStart={(e) => onDragStart(e, "max")}
        />
      </div>

      <div className={styles.inputContainer}>
        {enableInputs && showMaxInput && !isDragging ? (
          <input
            type="number"
            value={maxInputValue}
            onChange={(e) => setMaxInputValue(e.target.value)}
            onBlur={() => handleBlur("max")}
            onKeyDown={(e) => handleKeyDown(e, "max")}
            className={styles.valueInput}
            autoFocus
          />
        ) : (
          <span
            className={`${styles.label} ${
              enableInputs ? styles.clickable : ""
            }`}
            onClick={() => enableInputs && !isDragging && setShowMaxInput(true)}
          >
            {maxValue.toFixed(2)} <Euro size={16} />
          </span>
        )}
      </div>
    </div>
  );
}
