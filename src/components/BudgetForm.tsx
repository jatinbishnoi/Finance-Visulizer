'use client';

import { useState, FormEvent } from 'react';
import { Budget } from '@/types/Budget';

interface BudgetFormProps {
  onAdd: (newBudget: Budget) => void;
}

export default function BudgetForm({ onAdd }: BudgetFormProps) {
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        month,
        amount: parseFloat(amount),
      }),
    });
    const data: Budget = await res.json();
    onAdd(data);
    setCategory('');
    setMonth('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}
