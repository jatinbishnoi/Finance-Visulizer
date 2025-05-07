// src/models/Transaction.ts
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const TransactionModel = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
export default TransactionModel;
