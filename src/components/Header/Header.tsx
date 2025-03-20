"use client";

import Link from "next/link";
import { PAGES } from "@/utils/constants";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        {PAGES.map((page, index) => (
          <Link key={index} href={page.href}>
            {page.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
