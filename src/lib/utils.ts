import { BigNumber } from "bignumber.js";
import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

/**
 * Function to merge class names
 * @param inputs - The class names to merge
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Function to format a transaction hash
 * @param hash - The hash to format
 * @returns The formatted hash
 */
export function formatHash(hash: string) {
  return hash.slice(0, 5) + "..." + hash.slice(-3);
}

/**
 * Function to handle transaction errors
 * @param error - The error to handle
 * @param toastId - The ID of the toast to display
 */
export function handleTransactionError(error: Error, toastId: string) {
  if (error.name === 'ConnectorNotConnectedError') {
    toast.error('Please connect your wallet first', { id: toastId });
  } else if (error.message.includes('User denied')) {
    toast.error('User denied transaction', { id: toastId });
  } else {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Transaction failed';
    toast.error(errorMessage, { id: toastId });
  }
  throw error;
} 

// Add this helper function at the top of the component
export function getInputFontSize(value: string): string {
  const length = value.length;
  if (length > 18) return '0.8rem'; // 14px
  if (length > 12) return '1.125rem';  // 18px
  return '2rem'; // 32px default
};

export function formatInputValue(value: string, decimals: number): string {
  BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
  return new BigNumber(value).dp(decimals).toString();
}