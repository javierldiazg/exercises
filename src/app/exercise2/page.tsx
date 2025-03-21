"use client";

import { useRangeData } from "@/hooks/useRangeData";
import Header from "@/components/Header/Header";
import { Range } from "@/components/Range/Range";
import styles from "./exerciseTwo.module.css";

export default function ExerciseTwo() {
  const { data, loading, error } = useRangeData("fixed");

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {error && <p>{error}</p>}
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
