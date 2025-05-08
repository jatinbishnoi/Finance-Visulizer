import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  month: { type: String, required: true }, // e.g., "2025-05"
  amount: { type: Number, required: true },
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
