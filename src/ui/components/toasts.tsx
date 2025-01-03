import { TransactionHash } from '@/types';
import { formatHash } from '../../lib/utils';

export const ToastSuccessfullDeposit = ({hash}: {hash: TransactionHash}) => {
  return (
    <div>
      Deposit transaction submitted <br />
      <span>Hash: <a href={`https://holesky.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{formatHash(hash)}</a></span>
    </div>
  );
} 

export const ToastSuccessfullWithdrawal = ({hash}: {hash: TransactionHash}) => {
  return (
    <div>
      Withdrawal transaction submitted <br />
      <span>Hash: <a href={`https://holesky.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{formatHash(hash)}</a></span>
    </div>
  );
} 

export const ToastTransactionError = ({hash}: {hash: TransactionHash}) => {
  return <div>Transaction failed <br /> <span>Hash: <a href={`https://holesky.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{formatHash(hash)}</a></span></div>
} 