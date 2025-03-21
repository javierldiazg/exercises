import React from "react";
import { Euro } from "lucide-react";
import styles from "./Range.module.css";

interface RangeLabelProps {
  value: number;
  onClick: () => void;
  clickable: boolean;
}

export const RangeLabel = ({ value, onClick, clickable }: RangeLabelProps) => {
  return (
    <div
      className={`${styles.label} ${clickable ? "clickable" : ""}`}
      onClick={clickable ? onClick : undefined}
    >
      {value.toFixed(2)} <Euro data-testid="euro-icon" size={16} />
    </div>
  );
};
