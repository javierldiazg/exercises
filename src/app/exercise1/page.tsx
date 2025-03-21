"use client";

import { useRangeData } from "@/hooks/useRangeData";
import Header from "@/components/Header/Header";
import { Range } from "@/components/Range/Range";
import styles from "./exerciseOne.module.css";

export default function ExerciseOne() {
  const { data, loading, error } = useRangeData("normal");

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {error && <p>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : !data ? (
          <p>No range available.</p>
        ) : (
          <Range
            min={data.min!}
            max={data.max!}
            fixedValues={[]}
            onChange={() => {}}
            enableInputs={true}
          />
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
