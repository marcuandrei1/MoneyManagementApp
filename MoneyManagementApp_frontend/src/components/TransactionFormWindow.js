import React from "react";
import { useState } from "react";
import "../styles/transactionFormWindow.css";

function TransactionFormWindow({ onClose, onSubmit, accounts}) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState(accounts.find(type => type !== "Transactions") || "");
  const [account2,setAccount2]=useState(accounts.find(type => type !== "Transactions") || "");
  const [amount, setAmount] = useState("");
  
  const handleSubmit =async (e) => {
    e.preventDefault();
    await saveTransactionRequest(account, date, description, account2, amount);
    onSubmit();
  };
async function saveTransactionRequest(tableName,transactionDate,description,referenceTable,amount) {
  const url = `http://localhost:8080/tables/insertTable/${tableName}`;
  try{
    let send=0;
    let receive=0;
    if(amount>0){
      receive=amount;
    }
    else send=-amount;
    const response=await fetch(url,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({transactionDate:transactionDate,description:description,foreignReferenceTable:referenceTable,send:send,receive:receive})
    });
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
                onChange={(e) => {setAccount(e.target.value); console.log("Selected account:", e.target.value);}
                  
                }
              >
              {
                accounts.filter(type =>(type!=="Transactions")).map(type => {
                  return <option key={type} value={type}>
                    {type}
                  </option>
                })
              }
              </select>
            </div>
            <div className="tfw-col">
              <label>Account2</label>
              <select
                value={account2}
                onChange={(e) => {setAccount2(e.target.value);console.log("Selected account:", e.target.value);}}
              >
               {
                accounts.filter(type =>(type!=="Transactions")).map(type => {
                  return <option key={type} value={type}>
                    {type}
                  </option>
                })
              }
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
