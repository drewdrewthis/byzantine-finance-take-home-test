import { useCallback, useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { useAccount } from "wagmi";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault";
import { formatEther, parseEther } from "viem";

export function useVaultEstimateDepositGasFees(depositAmount: string) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [gasFees, setGasFees] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      if (!gasEstimate || !gasPrice) return null;

      // Calculate total gas fee in ETH
      const gasFeeWei = gasEstimate * gasPrice;
      const gasFeeEth = formatEther(gasFeeWei);

      return gasFeeEth;
    },
    [publicClient, address]
  );

  const fetchGasFees = useCallback(async () => {
    try {
      if (parseInt(depositAmount) === 0) {
        setGasFees(null);
        return;
      };

      setIsLoading(true);
      const gasFees = await estimateGasFees(depositAmount);
      setGasFees(gasFees);
    } catch (err) {
      if (!(err as Error).message.includes("insufficient funds")) {
        console.error("Error fetching gas fees:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [depositAmount, estimateGasFees]);

  useEffect(() => {
    fetchGasFees();
  }, [depositAmount, fetchGasFees]);

  return { gasFees, refetchGasFees: fetchGasFees, isLoading };
}