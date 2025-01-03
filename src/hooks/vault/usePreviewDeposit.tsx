import { useReadContract } from "wagmi";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault";
import { formatEther, parseEther } from "viem";

/**
 * Hook to preview the amount of shares that would be received for a given deposit amount
 * Uses the vault's previewDeposit function which simulates the deposit and returns expected shares
 */
export function usePreviewDeposit(amount: string) {
  const { data: shares, error } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'previewDeposit',
    args: [parseEther(amount)], // Default to 1 ETH for initial read
  });

  return {
    shares: shares ? formatEther(shares as bigint) : 0,
    error
  };
}
