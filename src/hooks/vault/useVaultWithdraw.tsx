import { useState } from "react";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import { useTransactionWatcher } from "../useTransactionWatcher";
import { ToastSuccessfullWithdrawal } from "../../ui/components/toasts";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault";
import { parseEther } from "viem";
import toast from "react-hot-toast";
import { handleTransactionError } from "../../lib/utils";
import { useVaultBalance } from "./useVaultBalance";

export function useVaultWithdraw() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const { handleWaitForTransactionReceipt } = useTransactionWatcher(); 
  const { refetchBalance } = useVaultBalance(); 

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
      handleTransactionError(err, toastId);
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { withdraw, isLoading, error };
}