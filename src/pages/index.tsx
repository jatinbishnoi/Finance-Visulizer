import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardSummary from "@/components/DashboardSummary";
import { groupByMonth } from "@/utils/groupByMonth";
import { getCategoryPieData } from "@/utils/categoryData";
import { Transaction } from "@/types/Transaction";
import { Budget } from "@/types/Budget"; // ✅ Import the Budget type

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]); // ✅ Strongly typed
  const [loading, setLoading] = useState(true);

  // Fetch transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch budgets
  useEffect(() => {
    const fetchBudgets = async () => {
      const res = await fetch("/api/budgets");
      const data = await res.json();
      setBudgets(data);
    };
    fetchBudgets();
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

          {/* ✅ Spending Insights Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">💡 Spending Insights</h2>
            <ul className="list-disc ml-5 mt-2">
              {budgets.map((b, index) => {
                const actual = transactions
                  .filter(
                    (txn) =>
                      txn.category === b.category &&
                      txn.date.startsWith(b.month)
                  )
                  .reduce((sum, txn) => sum + txn.amount, 0);

                const status = actual > b.amount ? "❌ Over budget" : "✅ On track";

                return (
                  <li key={`${b.month}-${b.category}-${index}`}> {/* Added index to key for uniqueness */}
                    {b.category} ({b.month}): Spent ₹{actual.toFixed(2)} / ₹
                    {b.amount} – <strong>{status}</strong>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
