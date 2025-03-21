import React from "react";
import { Euro } from "lucide-react";

interface RangeLabelProps {
  value: number;
  onClick: () => void;
  clickable: boolean;
}

export const RangeLabel = ({ value, onClick, clickable }: RangeLabelProps) => {
  return (
    <div
      className={`label ${clickable ? "clickable" : ""}`}
      onClick={clickable ? onClick : undefined}
    >
      {value.toFixed(2)} <Euro data-testid="euro-icon" />
    </div>
  );
};
