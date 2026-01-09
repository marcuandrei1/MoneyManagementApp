import React, { useEffect, useState } from "react";
import "../styles/accountsContentStyle.css";
import TransactionFormWindow from "./TransactionFormWindow";
import TablePagination from '@mui/material/TablePagination';

function AccountsContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("Transactions");
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionsRows, setTransactionsRows] = useState(0);
  const [tablesData, setTablesData]= useState([]);
  const [tablesRows, setTablesRows] = useState(0);
  const [page, setPage]= useState(0);
  const [editing, setEditing] = useState(null);

  async function getTransactionTable(numberOfEntries) {
    const url = `http://localhost:8080/tables/getHistoryTable?numberOfEntries=${numberOfEntries}&rowsSkip=${page*13}`;
    try{
      const response=await fetch(url);
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
      return response;
    }catch (error) {
      console.error(error.message);
    }
  }

  async function getGenericTable(tableName) {
    const url = `http://localhost:8080/tables/getTable/${tableName}?rowsSkip=${page*13}`;
    try{
      const response=await fetch(url);
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
      return response;
    }catch (error) {
      console.error(error.message);
    }  
  }

  const accountTypes = [
    "Transactions",
    ...new Set(transactions.map((item) => item.account)),
  ];
 const handleChangePage =(event, newPage) => { 
    setPage(newPage);
  };
  const handleTopDownButtonClick = async () => {
        setIsDropdownOpen(!isDropdownOpen); // toggle dropdown visibility
  }
  const getGenericTableData= async (tableName) =>{
     try {
        const response = await getGenericTable(tableName); 
        setTablesRows(response.headers.get("totalRows"));
        const data = await response.json();
        
        setTablesData(() => data.map((row) => ({
          id : row[0],
          date: row[1],
          description: row[2],
          account: row[3],
          send: row[4],
          receive: row[5],
          amount: row[6]
        })));
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
  }
  const getTransactionData = async () => {
     try {
            const response = await getTransactionTable(13);
            setTransactionsRows(response.headers.get("totalRows"));
            const data = await response.json();
            setTransactions(() => data.map((row) => ({
              id : row[0],
              account: row[1],
              date: row[2],
              description: row[3],
              send: row[4],
              receive: row[5],
              amount: row[6]
            })));
      } catch (error) {
        console.error("Failed to fetch dropdown dat  a:", error);
      }
  }
  useEffect(() => {
    const fetchData=async () => {
      
      if(selectedAccount==="Transactions"){
       await getTransactionData(); 
      }
      else{
        await getGenericTableData(selectedAccount);
      } 
    }
    fetchData();
  }, [page,selectedAccount]); 

  // Filter Logic
  const displayedTransactions =
    selectedAccount === "Transactions"
      ? transactions
      : tablesData;

  const handleCellChange = (rowIndex, field, value) => {
    displayedTransactions(prev =>
    prev.map((row, i) =>
      i === rowIndex ? { ...row, [field]: value } : row
    )
  );
};
const handleBlurSave = async (row) => {
  setEditing(null); // exit edit mode immediately

  try {
    await fetch("http://localhost:8080/transactions/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
  } catch (err) {
    console.error("Failed to save row", err);
  }
};
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
              onClick={handleTopDownButtonClick}
            >
              ▼
            </button>

            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {accountTypes.map((type, index) => (
                  <li
                    key={index}
                    onClick={() => {
                        setPage(0);
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
          accounts={accountTypes}
          onClose={() => setShowForm(false)}
          onSubmit={async () => {
            if(selectedAccount==="Transactions"){
              await getTransactionData(); 
            }
            else{
              await getGenericTableData(selectedAccount);
            } 
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
            <th>Send</th>
            <th>Received</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td onClick={() => setEditing({ rowIndex: index, field: "description" })}>
                {editing?.rowIndex === index && editing?.field === "description" ? (
                  <input
                    autoFocus
                    value={item.description}
                    onChange={(e) =>
                      handleCellChange(index, "description", e.target.value)
                    }
                    onBlur={() => handleBlurSave(item)}
                  />
                ) : (
                  item.description
                )}
              </td>
              <td>{item.account}</td>
              <td>{item.send}</td>
              <td>{item.receive}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        component="div"
        count={selectedAccount==="Transactions"? transactionsRows:tablesRows}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={13}
        rowsPerPageOptions={[]}
        sx={{
            color: "white"
        }}
      />
    </div>
  );
}

export default AccountsContent;
