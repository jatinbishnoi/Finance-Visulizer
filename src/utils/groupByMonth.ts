import type { Transaction } from "@/types/Transaction";

export const groupByMonth = (transactions: Transaction[]) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return []; // Return an empty array if transactions is not valid
  }

  const grouped: Record<string, number> = {};

  for (const txn of transactions) {
    const date = new Date(txn.date);
    if (!isNaN(date.getTime())) {
      const month = date.toISOString().slice(0, 7); // "YYYY-MM"
      grouped[month] = (grouped[month] || 0) + txn.amount;
    } else {
      console.warn("Invalid date found in transaction:", txn);
    }
  }

  return Object.entries(grouped).map(([month, total]) => ({ month, total }));
};
