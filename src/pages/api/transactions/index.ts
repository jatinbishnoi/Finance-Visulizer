// pages/api/transactions.ts (or .js depending on your setup)
import { NextApiRequest, NextApiResponse } from 'next';

// Sample transaction data for demonstration (you can fetch this from a database or file)
const transactions = [
  { _id: '1', amount: 100, date: '2025-05-01', description: 'Groceries', category: 'Food' },
  { _id: '2', amount: 200, date: '2025-05-02', description: 'Utilities', category: 'Bills' },
  // Add more sample transactions
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request to fetch all transactions
  if (req.method === 'GET') {
    res.status(200).json(transactions);
  } 
  // Handle POST request to add a new transaction (if needed)
  else if (req.method === 'POST') {
    // Logic to add a new transaction
    const newTransaction = req.body; // Assuming new data is sent in the request body
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
  } 
  // If method is not allowed (405)
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
