import { usePublicClient, useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-hot-toast';
import { ToastTransactionError } from '../ui/components/toasts';

export const useTransactionWatcher = () => {
  const client = usePublicClient();

  const handleWaitForTransactionReceipt = async (hash: `0x${string}`, toastId: string) => {
    toast.loading('Waiting for transaction to be confirmed...', { id: toastId }); 
    try {
      const receipt = await client?.waitForTransactionReceipt({
        hash,
        confirmations: 1,
      });
      
      if (receipt?.status === 'success') {
        toast.success('Transaction successful', { id: toastId });
        return receipt;
      } else {
        toast.error('Transaction failed', { id: toastId });
        throw new Error('Transaction failed');
      }
    } catch (error) {
      toast.error(<ToastTransactionError hash={hash} />, { id: toastId });
      throw error;
    }
  };

  return { handleWaitForTransactionReceipt };
};