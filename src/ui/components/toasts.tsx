import { Hash } from "viem";

interface TransactionToastProps {
  hash: Hash;
  message: string;
}

const TransactionToast = ({ hash, message }: TransactionToastProps) => {
  return (
    <div className="w-full max-w-[200px]">
      <span className="font-semibold">{message}</span> <br />
      <span className="w-full whitespace-nowrap inline-block text-xs text-ellipsis overflow-hidden">
        <a
          // TODO: This should come from a config that is aware of the connected chain
          href={`https://holesky.etherscan.io/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          {hash}
        </a>
      </span>
    </div>
  );
};

export const ToastSuccessfullDeposit = ({ hash }: { hash: Hash }) => (
  <TransactionToast hash={hash} message="Deposit transaction submitted" />
);

export const ToastSuccessfullWithdrawal = ({ hash }: { hash: Hash }) => (
  <TransactionToast hash={hash} message="Withdrawal transaction submitted" />
);

export const ToastTransactionError = ({ hash }: { hash: Hash }) => (
  <TransactionToast hash={hash} message="Transaction failed" />
);

export const ToastTransactionSuccess = ({ hash }: { hash: Hash }) => (
  <TransactionToast hash={hash} message="Transaction successful" />
);
