// components/DashboardSummary.tsx
import { Transaction } from "@/types/Transaction";

export default function DashboardSummary({ transactions }: { transactions: Transaction[] }) {
  const totalExpenses = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  const latest = transactions.slice(-5).reverse();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="text-sm text-gray-500">Total Expenses</h3>
        <p className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-4 col-span-2">
        <h3 className="text-sm text-gray-500 mb-2">Recent Transactions</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {latest.map((txn) => (
            <li key={txn._id}>
              ₹{txn.amount} – {txn.description} ({txn.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
