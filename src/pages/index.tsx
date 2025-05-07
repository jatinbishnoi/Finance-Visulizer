import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardSummary from "@/components/DashboardSummary";
import { groupByMonth } from "@/utils/groupByMonth";
import { getCategoryPieData } from "@/utils/categoryData";
import { Transaction } from "@/types/Transaction";

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Ensure it’s always an array
  const [loading, setLoading] = useState(true);

  // Fetch transactions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();

        // Ensure the data is an array before setting the state
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          console.error("Expected an array but received:", data);
          setTransactions([]); // Set an empty array if data is not valid
        }
      } catch (err) {
        console.error("Failed to fetch transactions", err);
        setTransactions([]); // Set empty array if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add a new transaction
  const addTransaction = async (txn: Omit<Transaction, "_id">) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(txn),
    });
    const newTxn = await res.json();
    setTransactions([newTxn, ...transactions]);
  };

  // Delete a transaction
  const deleteTransaction = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions(transactions.filter((txn) => txn._id !== id));
  };

  // Ensure transactions is valid before calling groupByMonth
  const monthlyChartData = groupByMonth(transactions);
  const pieChartData = getCategoryPieData(transactions);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">💰 Personal Finance Tracker</h1>

      <TransactionForm onSubmit={addTransaction} />

      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <>
          <DashboardSummary transactions={transactions} />
          <CategoryPieChart data={pieChartData} />
          <MonthlyChart data={monthlyChartData} />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </>
      )}
    </div>
  );
}
