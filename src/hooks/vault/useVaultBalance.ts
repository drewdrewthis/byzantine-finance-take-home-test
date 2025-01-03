import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_CONFIG } from '@/contracts/byzETHVault';
import { formatEther } from 'viem';
import { handleTransactionError } from '../../lib/utils';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

/**
 * Hook to read the user's vault share balance
 * @returns The user's vault share balance in ETH and a function to refetch the balance
 */
export function useVaultBalance() {
  const { address } = useAccount();

  const { data: balance, refetch: refetchBalance, error, isLoading, isRefetching } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => { 
    if (address && error) {
      console.error(error);
      toast.error('Error fetching balance'); 
    }
  }, [error, address]);

  return {
    balance: balance ? formatEther(balance as bigint) : null,
    refetchBalance,
    isLoading: isRefetching || isLoading
  };
}
