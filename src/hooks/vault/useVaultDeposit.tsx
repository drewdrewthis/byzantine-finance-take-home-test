import { useState } from "react";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { useTransactionWatcher } from "../useTransactionWatcher";
import { ToastSuccessfullDeposit } from "../../ui/components/toasts";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault";
import { parseEther } from "viem";
import toast from "react-hot-toast";
import { handleTransactionError } from "../../lib/utils";
import { useVaultBalance } from "./useVaultBalance";

export function useVaultDeposit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount();
  const { handleWaitForTransactionReceipt } = useTransactionWatcher(); 
  const { refetchBalance } = useVaultBalance();

  const deposit = async (amount: string) => {
    const toastId = toast.loading('Initiating deposit transaction...');

    try {
      if(!address) {
        toast.error('Please connect your wallet first', { id: toastId });
        return;
      } 

      if (!amount) {
        throw new Error("No amount found");
      }

      if (amount == "0") {
        throw new Error("Amount must be greater than 0");
      }

      setIsLoading(true);
      setError(null);
      const value = parseEther(amount);
      const hash = await writeContractAsync({
        ...CONTRACT_CONFIG,
        functionName: 'deposit',
        args: [value, address!],
        value,
      });
      toast.success(<ToastSuccessfullDeposit hash={hash} />, { id: toastId });
      const receipt = await handleWaitForTransactionReceipt(hash, toastId);
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

  return { deposit, isLoading, error };
}