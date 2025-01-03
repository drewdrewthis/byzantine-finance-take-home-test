// src/components/RestakeApp.tsx
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./RestakeApp.module.scss";
import ETH from "@/assets/tokens/ETH.png";
import { useVaultContract } from "../../hooks/vault/useVaultContract";
import { useBalanceETH } from "../../hooks/useBalanceETH";
import { useAccount } from "wagmi";
import { usePreviewDeposit } from "../../hooks/vault/usePreviewDeposit";
import { Button } from "../../ui/components/button";
import { Loader2 } from "lucide-react";
import transferArrow from "@/ui/components/icons/transfer-arrow.svg";
import { cn } from "../../lib/utils";
import { useVaultEstimateDepositGasFees } from "../../hooks/vault/useDepositGasFees";
import { useEthPrice } from "../../hooks/vault/useEthPrice";
import { usePreviewWithdraw } from "../../hooks/vault/usePreviewWithdraw";

const RestakeApp: React.FC = () => {
  const {
    balance: balanceOfVault,
    isLoading: isVaultLoading,
    deposit,
    withdraw,
    refetchBalance,
    symbol,
  } = useVaultContract();
  const { balance: currentBalance, isLoading: isLoadingBalance } =
    useBalanceETH();
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const { shares: previewReceiveAmount } = usePreviewDeposit(stakeAmount.toString());
  const { isConnected } = useAccount();
  const [isDeposit, setIsDeposit] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const { assets: previewWithdrawAmount } = usePreviewWithdraw(withdrawAmount.toString());
  const { gasFees: depositGasFees, refetchGasFees: refetchDepositGasFees, isLoading: isDepositGasFeesLoading } = useVaultEstimateDepositGasFees(stakeAmount.toString());
  const { convertEthToUsd, isLoading: isEthPriceLoading, error: ethPriceError } = useEthPrice();
  const isLoading = isVaultLoading || isLoadingBalance || isDepositGasFeesLoading || isEthPriceLoading

  const handleButtonClick = useCallback(() => {
    if (isDeposit) {
      deposit(stakeAmount.toString());
    } else {
      withdraw(previewReceiveAmount.toString());
    }
  }, [stakeAmount, isConnected]);

  useEffect(() => {
    if (isDeposit) {
      setWithdrawAmount(Number(previewReceiveAmount));
    }
  }, [isDeposit, previewReceiveAmount, stakeAmount]); 

  useEffect(() => {
    if (!isDeposit) { 
      setStakeAmount(Number(previewWithdrawAmount));
    }
  }, [previewWithdrawAmount, isDeposit]); 

  const handleRefresh = useCallback(() => {
    refetchBalance();
    refetchDepositGasFees();
  }, [refetchBalance, refetchDepositGasFees]);   

  return (
    <div className={styles.restakeApp}>
      <button className={styles.refreshIcon} onClick={() => handleRefresh()}>
        <svg
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 16C5.76667 16 3.875 15.225 2.325 13.675C0.775 12.125 0 10.2333 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C9.15 0 10.25 0.237333 11.3 0.712C12.35 1.18667 13.25 1.866 14 2.75V0H16V7H9V5H13.2C12.6667 4.06667 11.9373 3.33333 11.012 2.8C10.0867 2.26667 9.08267 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14C9.28333 14 10.4417 13.6333 11.475 12.9C12.5083 12.1667 13.2333 11.2 13.65 10H15.75C15.2833 11.7667 14.3333 13.2083 12.9 14.325C11.4667 15.4417 9.83333 16 8 16Z" />
        </svg>
      </button>
      <div className="flex flex-col gap-4 items-center">
      {/* Tokens to restake */}
      <div className={cn(styles.inputContainer, isDeposit ? 'order-1' : 'order-3')}>
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
              <span>${convertEthToUsd(stakeAmount).toFixed(8)}</span>
            </div>
          </div>
        </div>
      </div>


      {/* Switch arrows */}
      <button className={cn(styles.switchArrows, 'order-2')} onClick={() => setIsDeposit(!isDeposit)}>
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
      </button>

      {/* Receive tokens */}
      <div className={cn(styles.inputContainer, isDeposit ? 'order-3' : 'order-1')}>
        <div className={styles.label}>Receive</div>
        <div className={styles.lineInput}>
          <div className={styles.leftInput}>
            <div className={styles.tokenDiv}>
              {/* <div className={styles.waitingImg} /> */}
              <span className={`${styles.tokenSymbol} ${styles.vaultShare}`}>
                {symbol}
              </span>
            </div>

            <div className={`${styles.balance} ${styles.vaultShareBalance}`}>
              <span>Balance: {balanceOfVault ?? "--"}</span>
            </div>
          </div>
          <div className={styles.rightInput}>
            <div className={styles.resultAmount}>
              <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} />
            </div>
            <div className={styles.price}>
              <span>${convertEthToUsd(withdrawAmount).toFixed(8)}</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Restake button */}
      <Button
        className={styles.restakeBtn}
        onClick={() => {
          handleButtonClick();
        }}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : (isDeposit ? "Restake" : "Withdraw")}
      </Button>

      {/* Information section */}
      <div className={styles.infoSection}>
        {/* <div className={styles.infoLine}>
          Reward rate: <span className={styles.highlight}>+3.9%</span>
        </div> */}
        {/* <div className={styles.infoLine}>
          Validator activation:{" "}
          <span className={styles.highlight}>~0.4 jours</span>
        </div> */}
        {/* <div className={styles.infoLine}>
          Service fees: <span>0%</span>
        </div> */}
        <div className={styles.infoLine}>
          Gas fees: <span>{depositGasFees ? `~ $${convertEthToUsd(Number(depositGasFees)).toFixed(8)}` : "--"}</span>
        </div>
      </div>
    </div>
  );
};

export default RestakeApp;
