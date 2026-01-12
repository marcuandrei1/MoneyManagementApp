import React from "react";
import { useState } from "react";
import "../styles/transactionFormWindow.css";


function AccountFormWindow({ onClose, onSubmit}) {
    const [tableName, setTableName] = useState("");
    const [budget, setBudget] = useState(0);

    const handleSubmit =async (e) => {
        e.preventDefault();
        createNewTable(tableName,budget);
        onSubmit();
    };
    async function createNewTable(tableName, budget) {
        const url = `http://localhost:8080/tables/createTable/${tableName}?budget=${budget}`;
        try{
            const response=await fetch(url,{
            method:"POST",
            headers: { "Content-Type": "application/json" }});
            if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
            }
        }catch (error) {
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
                    placeholder=""
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                />
            <div className="tfw-col">
              <label>Budget</label>
              <input
                type="number"
                placeholder="$0.00"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
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