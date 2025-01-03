import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_CONFIG } from '@/contracts/byzETHVault';
import { useVaultDeposit } from './useVaultDeposit';
import { useVaultWithdraw } from './useVaultWithdraw';
import { formatEther } from 'viem';

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
    error: depositError || withdrawError
  };
}