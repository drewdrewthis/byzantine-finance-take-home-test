import { useAccount, useBalance } from "wagmi";

export function useUserBalance() {
  const { address } = useAccount()
  const { data: balance, isLoading } = useBalance({ address })
  return { 
    balance: {
      ...balance,
      // Currently deprecated, but abstracted for future use
      formatted: balance?.formatted
    },
    isLoading
  }
} 