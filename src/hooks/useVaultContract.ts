import { useAccount, useSimulateContract, useWriteContract, useReadContract } from 'wagmi';
import { CONTRACT_CONFIG } from '@/contracts/byzETHVault';
import { parseEther, formatEther } from 'viem';
import { useState } from 'react';

export function useVaultContract() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read balance
  const { data: balance = BigInt(0) } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address,
    }
  });

  // Simulate deposit transaction
  const { data: depositSimulation } = useSimulateContract({
    ...CONTRACT_CONFIG,
    functionName: 'deposit',
    value: BigInt(0), // Will be set when calling deposit
  });

  // Simulate withdraw transaction
  const { data: withdrawSimulation } = useSimulateContract({
    ...CONTRACT_CONFIG,
    functionName: 'withdraw',
  });

  // Write contract functions
  const { writeContract: depositWrite } = useWriteContract();
  const { writeContract: withdrawWrite } = useWriteContract();

  // Deposit ETH
  const deposit = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const hash = await depositWrite({
        ...CONTRACT_CONFIG,
        functionName: 'deposit',
        value: parseEther(amount),
      });
      await hash;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Withdraw ETH
  const withdraw = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const hash = await withdrawWrite({
        ...CONTRACT_CONFIG,
        functionName: 'withdraw',
        args: [parseEther(amount)],
      });
      await hash;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    balance: formatEther(balance as bigint),
    deposit,
    withdraw,
    isLoading,
    error,
  };
}