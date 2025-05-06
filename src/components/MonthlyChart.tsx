'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { month: string; total: number }[];
}

export default function MonthlyChart({ data }: Props) {
  return (
    <div className="mt-10 bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Monthly Expenses
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "none" }}
            labelStyle={{ color: "#6b7280" }}
            cursor={{ fill: "#f3f4f6" }}
          />
          <Bar dataKey="total" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
