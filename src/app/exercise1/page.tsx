"use client";

import { useEffect, useState } from "react";
import { Range } from "@/components/Range/Range";
import { getNormalRange } from "@/api/mockService";

export default function Exercise1() {
  const [data, setData] = useState<{ min: number; max: number } | null>(null);

  useEffect(() => {
    getNormalRange().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <Range
      min={data.min}
      max={data.max}
      fixedValues={[]}
      onChange={(values: { minValue: number; maxValue: number }) =>
        console.log(values)
      }
    />
  );
}
