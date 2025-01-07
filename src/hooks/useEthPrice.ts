import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { useCallback, useMemo } from "react";

interface EthereumPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

interface CachedData {
  data: EthereumPrice[];
  timestamp: number;
}

const CACHE_KEY = 'ethPrice';
const CACHE_EXPIRY = 30000; // 30 seconds in ms

/**
 * Custom hook to fetch and manage ETH price data from CoinGecko
 * Provides current ETH price and conversion utility
 * Uses localStorage caching to avoid rate limiting
 * Handles CORS with appropriate headers for Next.js/Vercel deployment
 * 
 * NOTE: 
 * This uses real ETH price, which won't necessarily be the same as the price of the ETH on Holesky
 * But this is a good enough approximation for the test
 * 
 * TODO: Add a reliable source of ETH price data that is chain-specific
 */
export function useEthPrice() {
  const { data: priceData, isLoading, error } = useQuery<EthereumPrice[]>({
    queryKey: ["ethPrice"],
    queryFn: async () => {
      // Try to get cached data
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache = JSON.parse(cached) as CachedData;
          if (Date.now() - parsedCache.timestamp < CACHE_EXPIRY) {
            return parsedCache.data;
          }
        }
      } catch (e) {
        console.warn('Cache parsing failed:', e);
        localStorage.removeItem(CACHE_KEY);
      }

      // Fetch fresh data
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum",
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          next: {
            revalidate: CACHE_EXPIRY / 1000
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update cache
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('Failed to update cache:', e);
      }

      return data;
    },
    refetchInterval: CACHE_EXPIRY,
    // Add stale time configuration
    staleTime: CACHE_EXPIRY,
  });

  const currentPrice = useMemo(() => priceData?.[0]?.current_price ?? 0, [priceData]);

  /**
   * Converts ETH amount to USD value
   * @param ethAmount Amount in ETH
   * @returns USD value as number
   */
   const convertEthToUsd = useCallback(
    (ethAmount: string): number => {
      return new BigNumber(ethAmount).multipliedBy(currentPrice).toNumber();
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
