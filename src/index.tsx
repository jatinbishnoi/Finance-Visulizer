export function groupByMonth(transactions: { amount: number; date: string | Date }[]) {
  const grouped: Record<string, number> = {};

  // eslint-disable-next-line prefer-const
  for (let txn of transactions) {
    const dateStr =
      typeof txn.date === "string" ? txn.date : txn.date.toISOString();
    const month = dateStr.slice(0, 7); // "YYYY-MM"
    grouped[month] = (grouped[month] || 0) + txn.amount;
  }

  return Object.entries(grouped).map(([month, total]) => ({ month, total }));
}
