import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { useState } from "react";
import { erc20Abi, Hash } from "viem";
import toast from "react-hot-toast";
import { useTransactionWatcher } from "../../../hooks/useTransactionWatcher";

// Maximum uint256 value for unlimited approval
const MAX_UINT256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export function useTokenApproval(tokenAddress: string, spenderAddress: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { handleWaitForTransactionReceipt } = useTransactionWatcher();

  // Check current allowance
  const { data: allowance = BigInt(0), refetch: refetchAllowance } = useReadContract({
    address: tokenAddress as Hash,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address!, spenderAddress as Hash],
    query: {
      enabled: !!address && !!tokenAddress && !!spenderAddress,
    }
  });

  /**
   * Approves the spender to spend the maximum amount of tokens
   */
  const approve = async () => {
    const toastId = toast.loading('Requesting approval...');
    try {
      setIsLoading(true);
      setError(null);

      const hash = await writeContractAsync({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spenderAddress as `0x${string}`, MAX_UINT256],
      });

      await handleWaitForTransactionReceipt(hash, toastId);
      toast.success('Approval successful', { id: toastId });
      await refetchAllowance();
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Approval failed';
      toast.error(errorMessage, { id: toastId });
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const hasApprovalForAmount = (amount: bigint) => allowance >= amount;

  return {
    allowance,
    hasApprovalForAmount,
    approve,
    isLoading,
    error,
  };
}