import React from "react";
import { useState } from "react";
import "../styles/transactionFormWindow.css";

function TransactionFormWindow({ onClose, onSubmit }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("Checking");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, description, account, amount });
  };

  return (
    <div className="tfw-overlay">
      <div className="tfw-modal">
        <div className="tfw-header">
          <h2>Add Transaction</h2>
          <button className="tfw-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="tfw-form">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            placeholder="Salary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="tfw-row">
            <div className="tfw-col">
              <label>Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option>Checking</option>
                <option>Debit Card</option>
                <option>Credit Card</option>
                <option>Savings</option>
              </select>
            </div>

            <div className="tfw-col">
              <label>Amount</label>
              <input
                type="number"
                placeholder="$0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="tfw-save-btn">
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransactionFormWindow;
