import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface EthereumPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

/**
 * Custom hook to fetch and manage ETH price data from CoinGecko
 * Provides current ETH price and conversion utility
 * 
 * NOTE: 
 * This uses real ETH price, which won't necessarily be the same as the price of the ETH on Holesky
 * But this is a good enough approximation for the test
 */
export function useEthPrice() {
  const { data: priceData, isLoading, error } = useQuery<EthereumPrice[]>({
    queryKey: ["ethPrice"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ETH price");
      }
      return response.json();
    },
    // Refresh every 30 seconds
    refetchInterval: 30000,
  });

  const currentPrice = useMemo(() => priceData?.[0]?.current_price ?? 0, [priceData]);

  /**
   * Converts ETH amount to USD value
   * @param ethAmount Amount in ETH
   * @returns USD value as number
   */
   const convertEthToUsd = useCallback(
    (ethAmount: number): number => {
      return ethAmount * currentPrice;
    },
    [currentPrice]
  );

  return {
    price: currentPrice,
    convertEthToUsd,
    isLoading,
    error,
  };
}
