import { useAccount, useBalance } from "wagmi";

export function useBalanceETH() {
  const { address } = useAccount()
  const { data: balance, refetch, isLoading } = useBalance({ address })
  return { 
    balance: {
      ...balance,
      // Currently deprecated, but abstracted for future use
      formatted: balance?.formatted
    },
    refetch,
    isLoading
  }
} 