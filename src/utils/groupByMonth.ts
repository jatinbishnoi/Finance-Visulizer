export function groupByMonth(transactions: { amount: number; date: string }[]) {
    const grouped: Record<string, number> = {};
    for (const txn of transactions) {
      const month = txn.date.slice(0, 7); // "YYYY-MM"
      grouped[month] = (grouped[month] || 0) + txn.amount;
    }
    return Object.entries(grouped).map(([month, total]) => ({ month, total }));
  }
  