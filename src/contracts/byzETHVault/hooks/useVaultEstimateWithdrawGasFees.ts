import { useCallback } from "react";
import { usePublicClient, useAccount } from "wagmi";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault/config";
import { formatEther, parseEther } from "viem";

/**
 * Hook for estimating gas fees for withdrawing from the byzETH vault
 */
export function useVaultEstimateWithdrawGasFees() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  /**
   * Estimates the gas fees required for withdrawing the specified amount from the vault
   */
  const estimateGasFees = useCallback(
    async (amount: string): Promise<string | null> => {
      // Return early if no wallet is connected
      if (!address || !publicClient) return null;

      try {
        // Convert input amount to Wei
        const value = parseEther(amount);

        // Estimate gas needed for the withdrawal transaction
        const gasEstimate = await publicClient.estimateContractGas({
          ...CONTRACT_CONFIG,
          functionName: "withdraw",
          args: [value, address, CONTRACT_CONFIG.address],
          account: address,
        });

        // Get current gas price from the network
        const gasPrice = await publicClient.getGasPrice();

        if (!gasEstimate || !gasPrice) return null;

        // Calculate total gas fee in Wei and convert to ETH
        const gasFeeWei = gasEstimate * gasPrice;
        const gasFeeEth = formatEther(gasFeeWei);

        return gasFeeEth;
      } catch (error) {
        console.error("Error estimating withdraw gas fees:", error);
        return null;
      }
    },
    [publicClient, address]
  );

  return { estimateGasFees };
}
