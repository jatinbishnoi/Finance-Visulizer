import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import { TransactionModel } from "@/models/TransactionModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await connectDB();

  if (req.method === "DELETE") {
    await TransactionModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
