// src/components/RestakeApp.tsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import styles from "./RestakeApp.module.scss";

import ETH from "@/assets/tokens/ETH.png";
import { useVaultContract } from "../../hooks/vault/useVaultContract";
import { useBalanceETH } from "../../hooks/useBalanceETH";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { usePreviewDeposit } from "../../hooks/vault/usePreviewDeposit";

const CHAIN_ID = 17000;

const RestakeApp: React.FC = () => {
  const {
    balance: balanceOfVault,
    isLoading: isLoadingBalanceOfVault,
    deposit,
  } = useVaultContract();
  const { balance: currentBalance, isLoading: isLoadingBalance } =
    useBalanceETH();
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const { shares, error } = usePreviewDeposit(stakeAmount.toString());
  const isLoading = isLoadingBalanceOfVault || isLoadingBalance;
  const { isConnected } = useAccount();

  const handleRestake = useCallback(() => {
    deposit(stakeAmount.toString());
  }, [stakeAmount, isConnected]);

  return (
    <div className={styles.restakeApp}>
      <div className={styles.refreshIcon}>
        <svg
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 16C5.76667 16 3.875 15.225 2.325 13.675C0.775 12.125 0 10.2333 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C9.15 0 10.25 0.237333 11.3 0.712C12.35 1.18667 13.25 1.866 14 2.75V0H16V7H9V5H13.2C12.6667 4.06667 11.9373 3.33333 11.012 2.8C10.0867 2.26667 9.08267 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14C9.28333 14 10.4417 13.6333 11.475 12.9C12.5083 12.1667 13.2333 11.2 13.65 10H15.75C15.2833 11.7667 14.3333 13.2083 12.9 14.325C11.4667 15.4417 9.83333 16 8 16Z" />
        </svg>
      </div>
      {/* Tokens to restake */}
      <div className={styles.inputContainer}>
        <div className={styles.label}>Restake</div>
        <div className={styles.lineInput}>
          <div className={styles.leftInput}>
            <div className={styles.tokenDiv}>
              <Image src={ETH} alt="ETH" width={32} height={32} />
              <span className={styles.tokenSymbol}>ETH</span>
            </div>

            <div className={styles.balance}>
              <span>
                Balance:{" "}
                {currentBalance.formatted
                  ? Number(currentBalance.formatted).toFixed(4)
                  : "--"}
              </span>
            </div>
          </div>
          <div className={styles.rightInput}>
            <input
              type="number"
              value={stakeAmount === null ? "" : stakeAmount}
              onChange={(e) =>
                setStakeAmount(
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              }
              placeholder="0"
            />

            <div className={styles.price}>
              <span>$0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Switch arrows */}
      <div className={styles.switchArrows}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.54544 2V22L1.63635 15.0909"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.4546 22L15.4546 2L22.3636 8.90909"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Receive tokens */}
      <div className={styles.inputContainer}>
        <div className={styles.label}>Receive</div>
        <div className={styles.lineInput}>
          <div className={styles.leftInput}>
            <div className={styles.tokenDiv}>
              {/* <div className={styles.waitingImg} /> */}
              <span className={`${styles.tokenSymbol} ${styles.vaultShare}`}>
                Vaultshare
              </span>
            </div>

            <div className={`${styles.balance} ${styles.vaultShareBalance}`}>
              <span>Balance: {Number(balanceOfVault).toFixed(4)}</span>
            </div>
          </div>
          <div className={styles.rightInput}>
            <div className={styles.resultAmount}>
              <div>{shares ? Number(shares).toFixed(4) : "0"}</div>
            </div>
            <div className={styles.price}>
              <span>$0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Restake button */}
      <button
        className={styles.restakeBtn}
        onClick={() => {
          handleRestake();
        }}
      >
        Restake
      </button>

      {/* Information section */}
      <div className={styles.infoSection}>
        {/* <div className={styles.infoLine}>
          Reward rate: <span className={styles.highlight}>+3.9%</span>
        </div> */}
        <div className={styles.infoLine}>
          Validator activation:{" "}
          <span className={styles.highlight}>~0.4 jours</span>
        </div>
        <div className={styles.infoLine}>
          Service fees: <span>0%</span>
        </div>
        <div className={styles.infoLine}>
          Gas fees: <span>~$0</span>
        </div>
      </div>
    </div>
  );
};

export default RestakeApp;
