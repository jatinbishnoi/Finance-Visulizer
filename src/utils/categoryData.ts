import { Transaction } from "../types/Transaction";

export function getCategoryPieData(transactions: Transaction[]) {
  const categoryTotals: { [key: string]: number } = {};

  transactions.forEach((txn) => {
    if (txn.category) {
      categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + txn.amount;
    }
  });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));
}
