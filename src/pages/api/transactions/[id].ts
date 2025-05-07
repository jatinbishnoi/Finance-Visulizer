import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import TransactionModel from "@/models/Transaction";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "DELETE") {
    try {
      const deleted = await TransactionModel.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      return res.status(200).json({ success: true });
    }  catch (err) {
      console.error("Error deleting transaction:", err); // Now it's used
      return res.status(500).json({ error: "Server error" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
