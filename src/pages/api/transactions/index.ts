import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import { TransactionModel } from "@/models/TransactionModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const transactions = await TransactionModel.find({});
    return res.status(200).json(transactions);
  }

  if (req.method === "POST") {
    const { amount, date, description } = req.body;
    const txn = await TransactionModel.create({ amount, date, description });
    return res.status(201).json(txn);
  }

  res.status(405).end();
}
