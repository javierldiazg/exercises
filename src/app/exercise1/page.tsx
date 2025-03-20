"use client";

import { useEffect, useState } from "react";
import { getNormalRange } from "@/api/mockService";
import Header from "@/components/Header/Header";
import { Range } from "@/components/Range/Range";
import styles from "./exerciseOne.module.css";

export default function ExerciseOne() {
  const [data, setData] = useState<{ min: number; max: number } | null>(null);

  useEffect(() => {
    getNormalRange().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Range
          min={data.min}
          max={data.max}
          fixedValues={[]}
          onChange={(values: { minValue: number; maxValue: number }) =>
            console.log(values)
          }
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
