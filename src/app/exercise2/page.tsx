"use client";

import { useEffect, useState } from "react";
import { getFixedRange } from "@/api/mockService";
import Header from "@/components/Header/Header";
import { Range } from "@/components/Range/Range";
import styles from "./exerciseTwo.module.css";

export default function ExerciseTwo() {
  const [data, setData] = useState<{ rangeValues: number[] } | null>(null);

  useEffect(() => {
    getFixedRange().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Range
          min={data.rangeValues[0]}
          max={data.rangeValues[data.rangeValues.length - 1]}
          fixedValues={data.rangeValues}
          onChange={() => {}}
          enableInputs={false}
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
