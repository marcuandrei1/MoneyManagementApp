import "../styles/dashboardRecentTransactionsStyle.css";
import { useState,useEffect } from "react";

export default function DashboardRecentTransactionComponent() {
   const [recentTransactions, setRecentTransactions] = useState([]);

  // TO-DO : de facut functia asta si modificat variabila transactions incat sa mearga cu baza de date
  async function getRecentTransactions() {
    const url = `http://localhost:8080/tables/getRecentTransactions?numberOfEntries=5`; // sa pui functia care face asta
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log(data);
      
     setRecentTransactions(
      data.map((row) => ({
        id: row.id,                // or row.id if you rename it backend-side
        account: row.originalTable,
        action: row.action,
        amount: row.amount
      }))
  );
    } catch (error) {
      console.error(error.message);
    }
  }
  
  useEffect(() => {
    const fetchData=async () => {
      await getRecentTransactions();
    }
    fetchData();
  }, []); 
  return (
    <div className="recent-transactions">
      <div className="recent-transactions-title">Recent Transactions</div>

      {recentTransactions.map((t, index) => (
        <div className="recent-transaction-row" key={index}>
          <div className="recent-transaction-name">{t.account}</div>
          <div className="recent-transaction-amount">Amount modified by $<strong>{t.amount}</strong> after {t.action}</div>
        </div>
      ))}
    </div>
  );
}
