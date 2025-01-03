import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHash(hash: string) {
  return hash.slice(0, 5) + "..." + hash.slice(-3);
}

export const handleTransactionError = (error: any, toastId: string) => {
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