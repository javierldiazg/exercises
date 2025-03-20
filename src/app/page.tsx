import Link from "next/link";
import { PAGES } from "@/utils/constants";
import Header from "@/components/Header/Header";
import styles from "@/styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          {PAGES.map((page, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardTitle}>
                <Link href={page.href}>{page.title}</Link>
              </div>
              <div className={styles.cardDescription}>{page.description}</div>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
