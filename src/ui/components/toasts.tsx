import { Hash } from 'viem';
import { formatHash } from '../../lib/utils';

export const ToastSuccessfullDeposit = ({hash}: {hash: Hash}) => {
  return (
    <div>
      Deposit transaction submitted <br />
      <span>Hash: <a href={`https://holesky.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{formatHash(hash)}</a></span>
    </div>
  );
} 

export const ToastSuccessfullWithdrawal = ({hash}: {hash: Hash}) => {
  return (
    <div>
      Withdrawal transaction submitted <br />
      <span>Hash: <a href={`https://holesky.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{formatHash(hash)}</a></span>
    </div>
  );
} 

export const ToastTransactionError = ({hash}: {hash: Hash}) => {
  return <div>Transaction failed <br /> <span>Hash: <a href={`https://holesky.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{formatHash(hash)}</a></span></div>
} 

export const ToastTransactionSuccess = ({hash}: {hash: Hash}) => {
  return <div>Transaction successful <br /> <span>Hash: <a href={`https://holesky.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{formatHash(hash)}</a></span></div>
}