import "../styles/dashboardRecentTransactionsStyle.css";
import { useState } from "react";

export default function DashboardRecentTransactionComponent() {
  const transactions = [
    { name: "Food & Drink", amount: "4.50" },
    { name: "Transport", amount: "120.00" },
    { name: "Shopping", amount: "90.50" },
    { name: "Utilities", amount: "25.00" },
  ];

  // TO-DO : de facut functia asta si modificat variabila transactions incat sa mearga cu baza de date
  async function getRecentTransactions() {
    const url = `http://localhost:8080/tables/getRecentTransactions`; // sa pui functia care face asta
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      transactions.concat();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="recent-transactions">
      <div className="recent-transactions-title">Recent Transactions</div>

      {transactions.map((t, index) => (
        <div className="recent-transaction-row" key={index}>
          <div className="recent-transaction-name">{t.name}</div>
          <div className="recent-transaction-amount">${t.amount}</div>
        </div>
      ))}
    </div>
  );
}
