export interface RangeProps {
  min: number;
  max: number;
  fixedValues?: number[];
  onChange: (values: { minValue: number; maxValue: number }) => void;
  enableInputs?: boolean;
}
