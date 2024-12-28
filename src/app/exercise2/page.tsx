"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import TableDisplay from "@/components/TableDisplay/TableDisplay";
import { VaultToDisplay } from "@/types/Table";
import Link from "next/link";
import dataTable from "@/data/dataTable.json";
import RestakeApp from "@/components/RestakeApp/RestakeApp";

export default function Home() {
  return (
    <section className={styles.page}>
      <div className={styles.explanation}>
        <h1>Exercise 2</h1>
        <p>Connect this component to the blockhain.</p>
        <p>
          More details{" "}
          <a
            href="https://byzantine.notion.site/PUBLIC-2-exercises-for-the-take-home-test-166e4c2abbc48083a078e3af7769b55f?pvs=4#166e4c2abbc480c08881dde8f92c0d1a"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <p>
          Move back to the <Link href="/">previous exercise</Link>.
        </p>
      </div>
      <div className={styles.appContainer}>
        <RestakeApp />
      </div>
    </section>
  );
}
