'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = ["Food", "Transport", "Utilities", "Entertainment", "Other"];

interface Props {
  onSubmit: (txn: { amount: number; date: string; description: string; category: string }) => void;
}

export default function TransactionForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.description || !form.category) {
      alert("All fields are required.");
      return;
    }
    console.log("Submitting transaction:", form);  // Log the form data here
    onSubmit({
      amount: parseFloat(form.amount),
      date: form.date,
      description: form.description,
      category: form.category,  // Ensure category is part of the submitted data
    });
    setForm({ amount: "", date: "", description: "", category: "" });
  };
  

  return (
    <Card className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-2xl border border-gray-200">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Add New Transaction
        </CardTitle>
        <p className="text-sm text-muted-foreground">Track your personal expenses</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-700">Amount (₹)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="e.g. 1200"
              value={form.amount}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-700">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="e.g. Groceries, Rent, etc."
              value={form.description}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-700">Category</Label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium"
          >
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
