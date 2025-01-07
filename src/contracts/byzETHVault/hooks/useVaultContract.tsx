import { useAccount, usePublicClient } from 'wagmi';
import { useVaultBalance } from './useVaultBalance';
import { useVaultDeposit } from './useVaultDeposit';
import { useVaultWithdraw } from './useVaultWithdraw';
import { CONTRACT_CONFIG } from '../config';
import { useVaultEstimateWithdrawGasFees } from './useVaultEstimateWithdrawGasFees';
import { useVaultEstimateDepositGasFees } from './useVaultEstimateDepositGasFees';
import { useEffect, useState } from 'react';

/**
 * Hook for interacting with the byzETH vault
 */
export function useVaultContract() {
  const client = usePublicClient(); 
  const { address } = useAccount();
  const { deposit, isLoading: isDepositLoading, error: depositError } = useVaultDeposit();
  const { withdraw, isLoading: isWithdrawLoading, error: withdrawError } = useVaultWithdraw();
  const { balance, refetchBalance, isLoading: isBalanceLoading } = useVaultBalance()
  const { estimateGasFees: estimateWithdrawGasFees } = useVaultEstimateWithdrawGasFees(); 
  const { estimateGasFees: estimateDepositGasFees } = useVaultEstimateDepositGasFees();
  const [symbol, setSymbol] = useState<string>();
  const [decimals, setDecimals] = useState<number>();
  const [isSymbolLoading, setIsSymbolLoading] = useState(true);
  const [isDecimalsLoading, setIsDecimalsLoading] = useState(true);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        if (!client) return;
        const [symbolData, decimalsData, maxWithdrawData] = await Promise.all([
          client.readContract({
            ...CONTRACT_CONFIG,
            functionName: 'symbol',
          }),
          client.readContract({
            ...CONTRACT_CONFIG, 
            functionName: 'decimals',
          }),
          client.readContract({
            ...CONTRACT_CONFIG, 
            functionName: 'maxWithdraw',
            args: [address ?? '0x0000000000000000000000000000000000000000'],  
          }), 
        ]);

        console.log({ maxWithdrawData });

        setSymbol(symbolData as string);
        setDecimals(decimalsData as number);
      } catch (error) {
        console.error('Error fetching contract data:', error);
      } finally {
        setIsSymbolLoading(false);
        setIsDecimalsLoading(false);
      }
    };

    fetchContractData();
  }, [client, address]);

  return {
    balance,
    deposit,
    withdraw,
    isLoading: isDepositLoading || isWithdrawLoading || isBalanceLoading || isSymbolLoading || isDecimalsLoading,
    error: depositError || withdrawError,
    refetchBalance,
    symbol,
    decimals,
    estimateWithdrawGasFees,
    estimateDepositGasFees,
  };
}
