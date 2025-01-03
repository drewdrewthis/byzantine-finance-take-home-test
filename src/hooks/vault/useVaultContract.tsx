import { useVaultBalance } from './useVaultBalance';
import { useVaultDeposit } from './useVaultDeposit';
import { useVaultWithdraw } from './useVaultWithdraw';

export function useVaultContract() {
  const { deposit, isLoading: isDepositLoading, error: depositError } = useVaultDeposit();
  const { withdraw, isLoading: isWithdrawLoading, error: withdrawError } = useVaultWithdraw();
  const { balance, refetchBalance, isLoading: isBalanceLoading } = useVaultBalance()

  return {
    balance,
    deposit,
    withdraw,
    isLoading: isDepositLoading || isWithdrawLoading || isBalanceLoading,
    error: depositError || withdrawError,
    refetchBalance
  };
}
