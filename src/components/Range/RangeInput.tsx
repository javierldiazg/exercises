import React from "react";
import { Euro } from "lucide-react";
import styles from "./Range.module.css";

interface RangeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  min: number;
  max: number;
  autoFocus?: boolean;
}

export const RangeInput = ({
  value,
  onChange,
  onBlur,
  onKeyPress,
  min,
  max,
  autoFocus = false,
}: RangeInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        className={styles.valueInput}
        step="0.01"
        min={min}
        max={max}
        autoFocus={autoFocus}
      />
      <Euro size={16} />
    </div>
  );
};
