"use client";

import { useEffect } from "react";
import { useRange } from "@/hooks/useRange";
import { useRangeInputs } from "@/hooks/useRangeInputs";
import { RangeProps } from "@/utils/types";
import { RangeInput } from "./RangeInput";
import { RangeLabel } from "./RangeLabel";
import { RangeTrack } from "./RangeTrack";
import styles from "./Range.module.css";

export function Range({
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

  const {
    showMinInput,
    setShowMinInput,
    showMaxInput,
    setShowMaxInput,
    minInputValue,
    maxInputValue,
    isDragging,
    setIsDragging,
    handleMinInputChange,
    handleMaxInputChange,
    handleInputBlur,
    handleKeyPress,
  } = useRangeInputs({
    min,
    max,
    minValue,
    maxValue,
    rangeRef,
    fixedValues,
    setMinValue,
    setMaxValue,
  });

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

  return (
    <div className={styles.rangeContainer}>
      {enableInputs && showMinInput && !isDragging ? (
        <RangeInput
          value={minInputValue}
          onChange={handleMinInputChange}
          onBlur={() => handleInputBlur("min")}
          onKeyPress={(e) => handleKeyPress(e, "min")}
          min={min}
          max={maxValue - 1}
          autoFocus
        />
      ) : (
        <RangeLabel
          value={minValue}
          onClick={() => enableInputs && !isDragging && setShowMinInput(true)}
          clickable={enableInputs}
        />
      )}

      <RangeTrack
        rangeRef={rangeRef}
        fixedValues={fixedValues}
        min={min}
        max={max}
        minValue={minValue}
        maxValue={maxValue}
        onHandleDragStart={handleDragStart}
      />

      {enableInputs && showMaxInput && !isDragging ? (
        <RangeInput
          value={maxInputValue}
          onChange={handleMaxInputChange}
          onBlur={() => handleInputBlur("max")}
          onKeyPress={(e) => handleKeyPress(e, "max")}
          min={minValue + 1}
          max={max}
          autoFocus
        />
      ) : (
        <RangeLabel
          value={maxValue}
          onClick={() => enableInputs && !isDragging && setShowMaxInput(true)}
          clickable={enableInputs}
        />
      )}
    </div>
  );
}
