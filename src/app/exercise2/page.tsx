"use client";
import styles from "./page.module.scss";
import Link from "next/link";
import RestakeApp from "@/components/RestakeApp/RestakeApp";
import { Web3Provider } from "@/context/Web3Provider";
import { Header } from "./components/header";

export default function Home() {
  return (
    <section className={styles.page}>
      <Header />
      <div className={styles.explanation}>
        <h1>Exercise 2</h1>
        <p>Connect this component to the blockhain.</p>
        <p>
          More details{" "}
          <a
            href="https://byzantine.notion.site/PUBLIC-2-exercises-for-the-take-home-test-166e4c2abbc48083a078e3af7769b55f?pvs=4#166e4c2abbc480c08881dde8f92c0d1a"
            target="_blank"
            className="text-link"
          >
            here
          </a>
          .
        </p>
        <p>
          Move back to the <Link href="/" className="text-link">previous exercise</Link>.
        </p>
      </div>
      <div className={styles.appContainer}>
        <Web3Provider>
          <RestakeApp />
        </Web3Provider>
      </div>
    </section>
  );
}
