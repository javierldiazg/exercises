"use client";

import { useEffect } from "react";
import { useRangeData } from "@/hooks/useRangeData";
import { getNormalRangeMock } from "@/api/mockServices";
import Header from "@/components/Header/Header";
import { RangeFull } from "@/components/RangeFull/RangeFull";
import styles from "./exerciseThree.module.css";

export default function ExerciseThree() {
  const { data, loading, error, setData } = useRangeData("normal");

  useEffect(() => {
    if (error) {
      getNormalRangeMock().then(setData);
    }
  }, [error, setData]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {loading ? (
          <p>Loading...</p>
        ) : !data ? (
          <p>No range available.</p>
        ) : (
          <RangeFull
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
