import { useState } from "react";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { useTransactionWatcher } from "../../../hooks/useTransactionWatcher";
import { ToastSuccessfullWithdrawal } from "../../../ui/components/toasts";
import { CONTRACT_CONFIG } from "../config";
import { parseEther } from "viem";
import toast from "react-hot-toast";
import { handleTransactionError } from "../../../lib/utils";
import { useVaultBalance } from "./useVaultBalance";

/**
 * Hook for withdrawing ETH from the byzETH vault
 */
export function useVaultWithdraw() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const { handleWaitForTransactionReceipt } = useTransactionWatcher(); 
  const { refetchBalance } = useVaultBalance(); 

  /**
   * Function to withdraw ETH from the vault
   * @param amount - The amount of ETH to withdraw
   * @returns A promise that resolves to the transaction receipt
   */
  const withdraw = async (amount: string) => {
    const toastId = toast.loading('Initiating withdrawal transaction...');
    try {
      setIsLoading(true);
      setError(null);
      const hash = await writeContractAsync({
        ...CONTRACT_CONFIG,
        functionName: 'withdraw',
        args: [parseEther(amount), address!, CONTRACT_CONFIG.address],
      });
      const receipt = await handleWaitForTransactionReceipt(hash, toastId);
      toast.success(<ToastSuccessfullWithdrawal hash={hash} />, { id: toastId });
      refetchBalance();
      return receipt;
    } catch (err) {
      console.error(err);
      handleTransactionError(err as Error, toastId);
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { withdraw, isLoading, error };
}