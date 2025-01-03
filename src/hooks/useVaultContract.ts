import { useAccount, useSimulateContract, useWriteContract, useReadContract } from 'wagmi';
import { CONTRACT_CONFIG } from '@/contracts/byzETHVault';
import { parseEther, formatEther } from 'viem';
import { useState } from 'react';

export function useVaultDeposit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  const deposit = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const hash = await writeContractAsync({
        ...CONTRACT_CONFIG,
        functionName: 'deposit',
        value: parseEther(amount),
      });
      return hash;
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
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

  const withdraw = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const hash = await writeContractAsync({
        ...CONTRACT_CONFIG,
        functionName: 'withdraw',
        args: [parseEther(amount)],
      });
      return hash;
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
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