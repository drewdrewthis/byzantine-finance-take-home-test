import { useVaultBalance } from './useVaultBalance';
import { useVaultDeposit } from './useVaultDeposit';
import { useVaultWithdraw } from './useVaultWithdraw';
import { formatEther } from 'viem';

export function useVaultContract() {
  const { deposit, isLoading: isDepositLoading, error: depositError } = useVaultDeposit();
  const { withdraw, isLoading: isWithdrawLoading, error: withdrawError } = useVaultWithdraw();
  const { balance } = useVaultBalance()

  return {
    balance,
    deposit,
    withdraw,
    isLoading: isDepositLoading || isWithdrawLoading,
    error: depositError || withdrawError
  };
}