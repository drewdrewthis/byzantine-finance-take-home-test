"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import RestakeApp from "@/components/RestakeApp/RestakeApp";
import { Web3Provider } from "@/context/Web3Provider";
import { Header } from "./components/header";
import { ToastTransactionSuccess } from "../../ui/components/toasts";
import toast from "react-hot-toast";

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
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
          onClick={() => {
            // Example transaction hash - in reality this would come from a real transaction
            const mockHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
            toast.success(<ToastTransactionSuccess hash={mockHash} />);
          }}
        >
          Test Transaction Toast
        </button>
        <div className="w-[200px]">
          <ToastTransactionSuccess hash="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" />
        </div>
      </div>
    </section>
  );
}
