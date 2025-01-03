import { useAccount, useSimulateContract, useWriteContract, useReadContract } from 'wagmi';
import { CONTRACT_CONFIG } from '@/contracts/byzETHVault';
import { parseEther, formatEther } from 'viem';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ToastSuccessfullDeposit, ToastSuccessfullWithdrawal } from '../ui/components/toasts';
import { useTransactionWatcher } from './useTransactionWatcher';

const handleTransactionError = (error: any, toastId: string) => {
  if (error.name === 'ConnectorNotConnectedError') {
    toast.error('Please connect your wallet first', { id: toastId });
  } else {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Transaction failed';
    toast.error(errorMessage, { id: toastId });
  }
  throw error;
} 


export function useVaultDeposit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount();
  const { handleWaitForTransactionReceipt } = useTransactionWatcher(); 

  const deposit = async (amount: string) => {
    const toastId = toast.loading('Initiating deposit transaction...');
    try {
      setIsLoading(true);
      setError(null);
      const hash = await writeContractAsync({
        ...CONTRACT_CONFIG,
        functionName: 'deposit',
        args: [parseEther(amount), address!],
      });
      toast.success(<ToastSuccessfullDeposit hash={hash} />, { id: toastId });
      const receipt = await handleWaitForTransactionReceipt(hash, toastId);
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

  return { deposit, isLoading, error };
}


export function useVaultWithdraw() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const { handleWaitForTransactionReceipt } = useTransactionWatcher(); 

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

export function useVaultContract() {
  const { address } = useAccount();
  const { deposit, isLoading: isDepositLoading, error: depositError } = useVaultDeposit();
  const { withdraw, isLoading: isWithdrawLoading, error: withdrawError } = useVaultWithdraw();

  // Read balance
  const { data: balance = BigInt(0) } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address,
    }
  });

  return {
    balance: formatEther(balance as bigint),
    deposit,
    withdraw,
    isLoading: isDepositLoading || isWithdrawLoading,
    error: depositError || withdrawError,
  };
}