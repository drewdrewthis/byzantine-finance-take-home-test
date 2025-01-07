import { Hash } from "viem";
import { formatHash } from "../../lib/utils";

interface TransactionToastProps {
  hash: Hash;
  message: string;
}

const TransactionToast = ({ hash, message }: TransactionToastProps) => {
  return (
    <div>
      {message} <br />
      <span>
        Hash:{" "}
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
