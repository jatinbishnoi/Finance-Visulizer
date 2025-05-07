export const groupByMonth = (transactions: Transaction[]) => {
  if (!transactions || transactions.length === 0) {
    return []; // Return an empty array if transactions is empty or undefined
  }

  const grouped: Record<string, number> = {};

  for (const txn of transactions) {
    // Ensure txn.date exists and is a valid string before calling .slice()
    if (txn.date && typeof txn.date === "string") {
      const month = txn.date.slice(0, 7); // "YYYY-MM"
      grouped[month] = (grouped[month] || 0) + txn.amount;
    } else {
      console.warn(`Invalid date found in transaction:`, txn);
    }
  }

  return Object.entries(grouped).map(([month, total]) => ({ month, total }));
};
