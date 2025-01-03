import { useReadContract } from 'wagmi';
import { useVaultBalance } from './useVaultBalance';
import { useVaultDeposit } from './useVaultDeposit';
import { useVaultWithdraw } from './useVaultWithdraw';
import { CONTRACT_CONFIG } from '../../contracts/byzETHVault';

export function useVaultContract() {
  const { deposit, isLoading: isDepositLoading, error: depositError } = useVaultDeposit();
  const { withdraw, isLoading: isWithdrawLoading, error: withdrawError } = useVaultWithdraw();
  const { balance, refetchBalance, isLoading: isBalanceLoading } = useVaultBalance()

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
  };
}
