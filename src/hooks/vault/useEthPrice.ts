import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface EthereumPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

const CACHE_KEY = 'ethPrice';
const CACHE_EXPIRY = 30000; // 30 seconds in ms

/**
 * Custom hook to fetch and manage ETH price data from CoinGecko
 * Provides current ETH price and conversion utility
 * Uses localStorage caching to avoid rate limiting
 * Handles CORS errors by using a proxy if needed
 * 
 * NOTE: 
 * This uses real ETH price, which won't necessarily be the same as the price of the ETH on Holesky
 * But this is a good enough approximation for the test
 */
export function useEthPrice() {
  const { data: priceData, isLoading, error } = useQuery<EthereumPrice[]>({
    queryKey: ["ethPrice"],
    queryFn: async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          return data;
        }
      }

      // Try direct API call first
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum",
          {
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
          }));
          return data;
        }
      } catch (err) {
        console.warn('Direct API call failed, trying proxy:', err);
      }

      // If direct call fails, try with CORS proxy
      const proxyResponse = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum",
        {
          headers: {
            'Accept': 'application/json',
            'Origin': window.location.origin
          }
        }
      );

      if (!proxyResponse.ok) {
        // Return cached data if available, even if expired
        if (cached) {
          const { data } = JSON.parse(cached);
          return data;
        }
        throw new Error("Failed to fetch ETH price");
      }
      
      const data = await proxyResponse.json();
      
      // Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));

      return data;
    },
    // Still refresh every 30 seconds
    refetchInterval: CACHE_EXPIRY,
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
