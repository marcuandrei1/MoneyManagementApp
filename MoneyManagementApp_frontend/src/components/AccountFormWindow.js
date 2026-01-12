import React, { useEffect, useRef, useState } from "react";
import "../styles/transactionFormWindow.css";

function AccountFormWindow({ onClose, onSubmit }) {
  const [tableName, setTableName] = useState("");
  const [budget, setBudget] = useState(0);

  const [accountType, setAccountType] = useState("Account type");
  const [isOpen, setIsOpen] = useState(false);
  const ddRef = useRef(null);

  const options = ["Venituri", "Active", "Cheltuieli"];

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewTable(tableName, budget);
    onSubmit();
  };

  async function createNewTable(tableName, budget) {
    const url = `http://localhost:8080/tables/createTable/${tableName}?budget=${budget}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="tfw-overlay">
      <div className="tfw-modal">
        <div className="tfw-header">
          <h2>Create Account</h2>
          <button className="tfw-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="tfw-form">
          <label>Table Name</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />

          <div className="tfw-col">
            <label>Budget</label>
            <input
              type="number"
              placeholder="$0.00"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>

          <label>Account type</label>

          <div className="tfw-dropdown" ref={ddRef}>
            <button
              type="button"
              className={`tfw-dropdown-btn ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen((v) => !v)}
            >
              <span>{accountType}</span>
              <span className={`tfw-caret ${isOpen ? "up" : ""}`} />
            </button>

            {isOpen && (
              <div className="tfw-dropdown-menu">
                {options.map((opt) => (
                  <button
                    type="button"
                    className="tfw-dropdown-item"
                    key={opt}
                    onClick={() => {
                      setAccountType(opt);
                      setIsOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="tfw-save-btn">
            Save Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountFormWindow;
