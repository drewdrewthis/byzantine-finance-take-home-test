import { useReadContract } from "wagmi";
import { CONTRACT_CONFIG } from "@/contracts/byzETHVault";
import { formatEther, parseEther } from "viem";

/**
 * Hook to preview the amount of ETH that would be received for withdrawing a given amount of shares
 * Uses the vault's previewWithdraw function which simulates the withdrawal and returns expected ETH amount
 * @param shares - The amount of shares to withdraw
 */
export function useVaultPreviewWithdraw(shares: string) {
  const { data: assets, error } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'previewWithdraw',
    args: [parseEther(shares)],
  });

  return {
    assets: assets ? formatEther(assets as bigint) : 0,
    error,
  };
}
