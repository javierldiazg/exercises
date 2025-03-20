"use client";

import { useEffect, useState } from "react";
import { Euro } from "lucide-react";
import { useRange } from "@/hooks/useRange";
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
  } = useRange(min, max, fixedValues);

  const [showMinInput, setShowMinInput] = useState(false);
  const [showMaxInput, setShowMaxInput] = useState(false);
  const [minInputValue, setMinInputValue] = useState(minValue.toFixed(2));
  const [maxInputValue, setMaxInputValue] = useState(maxValue.toFixed(2));
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setMinInputValue(minValue.toFixed(2));
    setMaxInputValue(maxValue.toFixed(2));
  }, [minValue, maxValue]);

  useEffect(() => {
    onChange({ minValue, maxValue });
  }, [minValue, maxValue, onChange]);

  const handleDragStart = (e: React.MouseEvent, type: "min" | "max") => {
    setIsDragging(true);
    setShowMinInput(false);
    setShowMaxInput(false);

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mouseup", onMouseUp);
    onDragStart(e, type);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInputValue(e.target.value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInputValue(e.target.value);
  };

  const applyMinValue = () => {
    const newValue = parseFloat(minInputValue);
    if (!isNaN(newValue) && newValue >= min && newValue < maxValue) {
      const percent = (newValue - min) / (max - min);
      if (rangeRef.current) {
        const rect = rangeRef.current.getBoundingClientRect();
        const fakeEvent = {
          clientX: rect.left + percent * rect.width,
        } as MouseEvent;

        const onMouseMove = (moveEvent: MouseEvent) => {
          if (!rangeRef.current) return;
          const rect = rangeRef.current.getBoundingClientRect();
          const percent = (moveEvent.clientX - rect.left) / rect.width;
          let newValue = min + percent * (max - min);

          if (fixedValues && fixedValues.length > 0) {
            newValue = fixedValues.reduce((prev, curr) =>
              Math.abs(curr - newValue) < Math.abs(prev - newValue)
                ? curr
                : prev
            );
          }

          newValue = Math.max(min, Math.min(newValue, max));
          setMinValue(Math.min(newValue, maxValue - 1));
        };

        onMouseMove(fakeEvent);
      }
    }
    setShowMinInput(false);
  };

  const applyMaxValue = () => {
    const newValue = parseFloat(maxInputValue);
    if (!isNaN(newValue) && newValue <= max && newValue > minValue) {
      const percent = (newValue - min) / (max - min);
      if (rangeRef.current) {
        const rect = rangeRef.current.getBoundingClientRect();
        const fakeEvent = {
          clientX: rect.left + percent * rect.width,
        } as MouseEvent;

        const onMouseMove = (moveEvent: MouseEvent) => {
          if (!rangeRef.current) return;
          const rect = rangeRef.current.getBoundingClientRect();
          const percent = (moveEvent.clientX - rect.left) / rect.width;
          let newValue = min + percent * (max - min);

          if (fixedValues && fixedValues.length > 0) {
            newValue = fixedValues.reduce((prev, curr) =>
              Math.abs(curr - newValue) < Math.abs(prev - newValue)
                ? curr
                : prev
            );
          }

          newValue = Math.max(min, Math.min(newValue, max));
          setMaxValue(Math.max(newValue, minValue + 1));
        };

        onMouseMove(fakeEvent);
      }
    }
    setShowMaxInput(false);
  };

  const handleInputBlur = (type: "min" | "max") => {
    if (type === "min") {
      applyMinValue();
    } else {
      applyMaxValue();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: "min" | "max") => {
    if (e.key === "Enter") {
      if (type === "min") {
        applyMinValue();
      } else {
        applyMaxValue();
      }
    }
  };

  return (
    <div className={styles.rangeContainer}>
      {enableInputs && showMinInput && !isDragging ? (
        <div className={styles.inputWrapper}>
          <input
            type="number"
            value={minInputValue}
            onChange={handleMinInputChange}
            onBlur={() => handleInputBlur("min")}
            onKeyPress={(e) => handleKeyPress(e, "min")}
            className={styles.valueInput}
            step="0.01"
            min={min}
            max={maxValue - 1}
            autoFocus
          />
          <Euro size={16} />
        </div>
      ) : (
        <div
          className={`${styles.label} ${enableInputs ? styles.clickable : ""}`}
          onClick={() => enableInputs && !isDragging && setShowMinInput(true)}
        >
          {minValue.toFixed(2)} <Euro size={16} />
        </div>
      )}

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
          onMouseDown={(e) => handleDragStart(e, "min")}
        />
        <div
          className={styles.handle}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          style={{ left: `${((maxValue - min) / (max - min)) * 100}%` }}
          onMouseDown={(e) => handleDragStart(e, "max")}
        />
      </div>

      {enableInputs && showMaxInput && !isDragging ? (
        <div className={styles.inputWrapper}>
          <input
            type="number"
            value={maxInputValue}
            onChange={handleMaxInputChange}
            onBlur={() => handleInputBlur("max")}
            onKeyPress={(e) => handleKeyPress(e, "max")}
            className={styles.valueInput}
            step="0.01"
            min={minValue + 1}
            max={max}
            autoFocus
          />
          <Euro size={16} />
        </div>
      ) : (
        <div
          className={`${styles.label} ${enableInputs ? styles.clickable : ""}`}
          onClick={() => enableInputs && !isDragging && setShowMaxInput(true)}
        >
          {maxValue.toFixed(2)} <Euro size={16} />
        </div>
      )}
    </div>
  );
}
