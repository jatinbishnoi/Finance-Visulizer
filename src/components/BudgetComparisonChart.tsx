import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
  import { Transaction } from '@/types/Transaction';
  import { Budget } from '@/types/Budget';
  
  interface Props {
    budgets: Budget[];
    transactions: Transaction[];
  }
  
  export default function BudgetComparisonChart({ budgets, transactions }: Props) {
    // Properly typed object with string keys and number values
    const grouped: Record<string, number> = {};
  
    transactions.forEach((txn) => {
      const month = txn.date.slice(0, 7);
      const key = `${month}-${txn.category}`;
      grouped[key] = (grouped[key] || 0) + txn.amount;
    });
  
    const data = budgets.map((b) => {
      const key = `${b.month}-${b.category}`;
      return {
        category: `${b.category} (${b.month})`,
        budget: b.amount,
        actual: grouped[key] || 0,
      };
    });
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  