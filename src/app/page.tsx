import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
          <li>
            <Link href="/exercise1">Exercise 1</Link>
          </li>
          <li>
            <Link href="/exercise2">Exercise 2</Link>
          </li>
        </ul>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
