"use client";

import { useEffect } from "react";
import { useRangeData } from "@/hooks/useRangeData";
import { getFixedRangeMock } from "@/api/mockServices";
import Header from "@/components/Header/Header";
import { Range } from "@/components/Range/Range";
import styles from "./exerciseTwo.module.css";

export default function ExerciseTwo() {
  const { data, loading, error, setData } = useRangeData("fixed");

  useEffect(() => {
    if (error) {
      getFixedRangeMock().then(setData);
    }
  }, [error, setData]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {loading ? (
          <p>Loading...</p>
        ) : !data?.rangeValues ? (
          <p>No range available.</p>
        ) : (
          <Range
            min={data.rangeValues[0]}
            max={data.rangeValues[data.rangeValues.length - 1]}
            fixedValues={data.rangeValues}
            onChange={() => {}}
            enableInputs={false}
          />
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
