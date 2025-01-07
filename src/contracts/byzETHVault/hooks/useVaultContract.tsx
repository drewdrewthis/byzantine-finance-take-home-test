import { useReadContract } from 'wagmi';
import { useVaultBalance } from './useVaultBalance';
import { useVaultDeposit } from './useVaultDeposit';
import { useVaultWithdraw } from './useVaultWithdraw';
import { CONTRACT_CONFIG } from '../config';
import { useVaultEstimateWithdrawGasFees } from './useVaultEstimateWithdrawGasFees';
import { useVaultEstimateDepositGasFees } from './useVaultEstimateDepositGasFees';

/**
 * Hook for interacting with the byzETH vault
 */
export function useVaultContract() {
  const { deposit, isLoading: isDepositLoading, error: depositError } = useVaultDeposit();
  const { withdraw, isLoading: isWithdrawLoading, error: withdrawError } = useVaultWithdraw();
  const { balance, refetchBalance, isLoading: isBalanceLoading } = useVaultBalance()
  const { estimateGasFees: estimateWithdrawGasFees } = useVaultEstimateWithdrawGasFees(); 
  const { estimateGasFees: estimateDepositGasFees } = useVaultEstimateDepositGasFees();

  const { data: symbol, isLoading: isSymbolLoading } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'symbol',
  });


  return {
    balance,
    deposit,
    withdraw,
    isLoading: isDepositLoading || isWithdrawLoading || isBalanceLoading || isSymbolLoading,
    error: depositError || withdrawError,
    refetchBalance,
    symbol,
    estimateWithdrawGasFees,
    estimateDepositGasFees,
  };
}
