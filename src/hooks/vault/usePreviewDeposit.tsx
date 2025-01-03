import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault";
import { formatEther, parseEther } from "viem";

/**
 * Hook to preview the amount of shares that would be received for a given deposit amount
 * Uses the vault's previewDeposit function which simulates the deposit and returns expected shares
 */
export function usePreviewDeposit(amount: string) {
  const { address } = useAccount(); 
  const { data: shares, error } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'previewDeposit',
    args: [parseEther(amount)], // Default to 1 ETH for initial read
  });

  const { data: maxDeposit } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'maxDeposit',
    args: [address!],
  }); 

  const maxDepositAmount = maxDeposit ? formatEther(maxDeposit as bigint) : 0;

  return {
    shares: shares ? formatEther(shares as bigint) : 0,
    maxDeposit: maxDepositAmount,
    error,
    isTooHigh: Number(maxDepositAmount) < Number(amount),
  };
}
