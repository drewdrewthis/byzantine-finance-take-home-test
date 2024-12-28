"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import TableDisplay from "@/components/TableDisplay/TableDisplay";
import { VaultToDisplay } from "@/types/Table";
import Link from "next/link";
import dataTable from "@/data/dataTable.json";

export default function Home() {
  const [listVaultToDisplay, setListVaultToDisplay] = useState<
    VaultToDisplay[]
  >(dataTable as VaultToDisplay[]);
  return (
    <section className={styles.page}>
      <div className={styles.explanation}>
        <h1>Exercise 1</h1>
        <p>Create a search bar to filter vault data.</p>
        <p>
          More details{" "}
          <a
            href="https://byzantine.notion.site/PUBLIC-2-exercises-for-the-take-home-test-166e4c2abbc48083a078e3af7769b55f?pvs=4#166e4c2abbc4808a9c49c215a749dbb0"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <p>
          Move to the <Link href="/exercise2">next exercise</Link>.
        </p>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.nameAndSearch}>
          <h2>The vaults</h2>
          <input type="text" placeholder="This is what you need to replace" />
        </div>
        <TableDisplay data={listVaultToDisplay} />
      </div>
    </section>
  );
}
