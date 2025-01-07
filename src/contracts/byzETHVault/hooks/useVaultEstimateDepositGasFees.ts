import { useCallback } from "react";
import { usePublicClient } from "wagmi";
import { useAccount } from "wagmi";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault/config";
import { formatEther, parseEther } from "viem";

/**
 * Hook for estimating gas fees for depositing ETH into the byzETH vault
 */
export function useVaultEstimateDepositGasFees() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  /**
   * Estimates the gas fees required for depositing the specified amount into the vault
   */ 
  const estimateGasFees = useCallback(
    async (amount: string) => {
      if (!address) return null;

      const value = parseEther(amount);

      // Estimate gas needed for the transaction
      const gasEstimate = await publicClient?.estimateContractGas({
        ...CONTRACT_CONFIG,
        functionName: "deposit",
        args: [value, address],
        value,
        account: address,
      });

      // Get current gas price
      const gasPrice = await publicClient?.getGasPrice();

      if (!gasEstimate || !gasPrice) {
        console.error("Failed to estimate gas fees", {
          gasEstimate,
          gasPrice,
        });
        return null;
      }

      // Calculate total gas fee in ETH
      const gasFeeWei = gasEstimate * gasPrice;
      const gasFeeEth = formatEther(gasFeeWei);

      return gasFeeEth;
    },
    [publicClient, address]
  );

  return { estimateGasFees };
}