'use client';

import { useState } from "react";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (txn: Transaction) => void;
}

export default function TransactionList({ transactions, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTxn, setCurrentTxn] = useState<Transaction | null>(null);

  const handleEdit = (txn: Transaction) => {
    setIsEditing(true);
    setCurrentTxn(txn);
  };

  const handleSave = () => {
    if (currentTxn) {
      onEdit(currentTxn);
      setIsEditing(false);
      setCurrentTxn(null);
    }
  };

  return (
    <div className="mt-10 space-y-4">
      {transactions.map((txn) => (
        <div
          key={txn._id}
          className="flex items-start justify-between gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4"
        >
          <div className="flex-1">
            <p className="text-xl font-bold text-gray-800 mb-1">
              ₹{txn.amount.toFixed(2)}
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
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(txn)}
              className="text-blue-500 hover:text-blue-600 hover:underline text-sm font-semibold transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(txn._id)}
              className="text-red-500 hover:text-red-600 hover:underline text-sm font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {isEditing && currentTxn && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Transaction</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                <input
                  type="number"
                  value={currentTxn.amount}
                  onChange={(e) => setCurrentTxn({ ...currentTxn, amount: parseFloat(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={currentTxn.date}
                  onChange={(e) => setCurrentTxn({ ...currentTxn, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={currentTxn.description}
                  onChange={(e) => setCurrentTxn({ ...currentTxn, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full p-2 text-white bg-gray-500 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full p-2 text-white bg-blue-600 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
