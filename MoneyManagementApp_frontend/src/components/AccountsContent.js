import React, { useState } from "react";
import "../styles/accountsContentStyle.css";
import TransactionFormWindow from "./TransactionFormWindow";

function AccountsContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("Transactions");
  const [showForm, setShowForm] = useState(false);

  const transactions = [
    {
      date: "April 18, 2024",
      description: "Salary",
      account: "Checking",
      amount: "$3,000.00",
    },
    {
      date: "April 17, 2024",
      description: "Groceries",
      account: "Debit Card",
      amount: "- $150.00",
    },
    {
      date: "April 15, 2024",
      description: "Rent",
      account: "Checking",
      amount: "- $1,200.00",
    },
    {
      date: "April 13, 2024",
      description: "Electricity",
      account: "Credit Card",
      amount: "- $75.00",
    },
  ];

  const accountTypes = [
    "Transactions",
    ...new Set(transactions.map((item) => item.account)),
  ];

  // Filter Logic
  const displayedTransactions =
    selectedAccount === "Transactions"
      ? transactions
      : transactions.filter((t) => t.account === selectedAccount);

  return (
    // 1. Everything must be inside this main container
    <div className="accounts-container">
      {/* 2. The Header Section */}
      <div className="accounts-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{selectedAccount}</h2>

          <div className="dropdown-container">
            <button
              className="topDownButton"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              ▼
            </button>

            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {accountTypes.map((type, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedAccount(type);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          className="add-transaction-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Transaction
        </button>
      </div>

      {showForm && (
        <TransactionFormWindow
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log("New transaction:", data);
            setShowForm(false);
          }}
        />
      )}

      {/* 3. The Table Section (This was missing) */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.account}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountsContent;
