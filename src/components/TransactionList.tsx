'use client';

import { Transaction } from '@/types/Transaction';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-lg font-semibold mb-2">📜 Transactions</h2>
      {transactions.map((txn) => (
        <div
          key={txn._id || txn.date + txn.category} // Ensure the key is unique (fallback if _id is missing)
          className="flex items-start justify-between gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4"
        >
          <div className="flex-1">
            <p className="text-xl font-bold text-gray-800 mb-1">
              ₹{txn.amount && !isNaN(txn.amount) ? txn.amount.toFixed(2) : "0.00"}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(txn.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-700 mt-2 break-words">
              {txn.description}
            </p>
            <p className="text-sm text-gray-500 mt-1 italic">
              Category: {txn.category}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(txn._id)}
              className="text-red-500 hover:text-red-600 hover:underline text-sm font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
