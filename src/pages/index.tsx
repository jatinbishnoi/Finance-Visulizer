'use client';

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import { groupByMonth } from "@/utils/groupByMonth";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTransaction = async (txn: Omit<Transaction, "_id">) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(txn),
    });
    const newTxn = await res.json();
    setTransactions([newTxn, ...transactions]);
  };

  const deleteTransaction = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions(transactions.filter((txn) => txn._id !== id));
  };

  const chartData = groupByMonth(transactions);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">💰 Personal Finance Tracker</h1>

      <TransactionForm onSubmit={addTransaction} />

      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <>
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          <MonthlyChart data={chartData} />
        </>
      )}
    </div>
  );
}
