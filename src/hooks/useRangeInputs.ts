import { useState, useEffect } from "react";

interface UseRangeInputsProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  rangeRef: React.RefObject<HTMLDivElement | null>;
  fixedValues?: number[];
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
}

export const useRangeInputs = ({
  min,
  max,
  minValue,
  maxValue,
  rangeRef,
  fixedValues,
  setMinValue,
  setMaxValue,
}: UseRangeInputsProps) => {
  const [showMinInput, setShowMinInput] = useState(false);
  const [showMaxInput, setShowMaxInput] = useState(false);
  const [minInputValue, setMinInputValue] = useState(minValue.toFixed(2));
  const [maxInputValue, setMaxInputValue] = useState(maxValue.toFixed(2));
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setMinInputValue(minValue.toFixed(2));
    setMaxInputValue(maxValue.toFixed(2));
  }, [minValue, maxValue]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInputValue(e.target.value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInputValue(e.target.value);
  };

  const calculateNewValue = (moveEvent: MouseEvent, type: "min" | "max") => {
    if (!rangeRef.current) return;
    const rect = rangeRef.current.getBoundingClientRect();
    const percent = (moveEvent.clientX - rect.left) / rect.width;
    let newValue = min + percent * (max - min);

    if (fixedValues && fixedValues.length > 0) {
      newValue = fixedValues.reduce((prev, curr) =>
        Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
      );
    }

    newValue = Math.max(min, Math.min(newValue, max));

    if (type === "min") {
      setMinValue(Math.min(newValue, maxValue - 1));
    } else {
      setMaxValue(Math.max(newValue, minValue + 1));
    }
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
        calculateNewValue(fakeEvent, "min");
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
        calculateNewValue(fakeEvent, "max");
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

  return {
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
  };
};
