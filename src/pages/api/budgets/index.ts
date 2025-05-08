import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import Budget from "@/models/Budget";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const budgets = await Budget.find();
    return res.status(200).json(budgets);
  }

  if (req.method === "POST") {
    const { category, month, amount } = req.body;
    const budget = await Budget.create({ category, month, amount });
    return res.status(201).json(budget);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
