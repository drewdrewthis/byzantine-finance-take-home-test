"use client";
import { useCallback, useState } from "react";
import styles from "./page.module.scss";
import TableDisplay from "@/components/TableDisplay/TableDisplay";
import { VaultToDisplay } from "@/types/Table";
import Link from "next/link";
import dataTable from "@/data/dataTable.json";
import { SearchBar } from "../components/SearchBar";

export default function Home() {
  const [listVaultToDisplay, setListVaultToDisplay] = useState<
    VaultToDisplay[]
  >(dataTable as VaultToDisplay[]);

  /**
   * Test notes:
   * This is a simple search call back that will filter the vaults by name or address based on the search input.
   * If there were a lot of vaults, we'd consider offloading this to the backend by sending query parameters to the API.
   */
  const handleInputChange = useCallback ((input: string) => {
    const filterFn = (vault: VaultToDisplay) => vault.name.toLowerCase().includes(input.toLowerCase()) || vault.address.toLowerCase().includes(input.toLowerCase());
    setListVaultToDisplay((dataTable as VaultToDisplay[]).filter(filterFn));
  }, []);

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
            className="text-link"
          >
            here
          </a>
          .
        </p>
        <p>
          Move to the <Link href="/exercise2" className="text-link">next exercise</Link>.
        </p>
      </div>
      <div className={styles.tableContainer}>
        <div className="flex justify-between w-full items-center">
          <h2>The vaults</h2>
          <SearchBar onInputChange={handleInputChange} />
        </div>
        <TableDisplay data={listVaultToDisplay} />
      </div>
    </section>
  );
}
