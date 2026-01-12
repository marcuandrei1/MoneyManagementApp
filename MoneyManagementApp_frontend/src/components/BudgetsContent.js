import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as FaIcons from "react-icons/fa";
import "../styles/budgetsContent.css";

function getColorBySum(remaining, allocated) {
  const ratio = remaining / allocated; // intre 0 si 1
  const red = Math.floor((1 - ratio) * 255);
  const green = Math.floor(ratio * 255);

  return `rgb(${red}, ${green}, 50)`;
}
function getIconBySubstring(name) {
  // Convert to lowercase for case-insensitive match
  const lowerName = name.toLowerCase();

  // Search for an icon whose name includes the substring
  const match = Object.entries(FaIcons).find(([iconName]) =>
    iconName.replace(/^Fa/,"").toLowerCase().startsWith(lowerName) // remove 'Fa' prefix
  );

  // Return the component or a fallback
  return match ? match[1] : FaIcons.FaBolt  ; // fallback icon
}
function BudgetsContent() {
  // pentru cand luam din baza de date
  const [budgets, setBudgets] = useState([]);
  const [numberBudgets, setNumberBudgets] = useState(0);
  const [showPagination, setShowPagination ] = useState(false);
  const [page, setPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (event, value) => {
    setPage(value); // value = new page number
  };
  async function getBudgets() {
    const url = `http://localhost:8080/tables/getMetadataTable?rowsSkip=${(page-1)*15}`;
    try{
      const response=await fetch(url);
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
      const numberBudgets=response.headers.get("totalRows");
      setNumberBudgets(numberBudgets);
      if(numberBudgets>15){
        setShowPagination(true);
      }
      else setShowPagination(false);
      const data=await response.json();
      setBudgets(() => data.map(row => ({
        icon: getIconBySubstring(row[0]),
        name: row[0],
        allocated: row[1],
        remaining: row[2],
      })))
    }catch (error) {
      console.error(error.message);
    }
  }
  async function updateBudgets(budgetTable) {
    const url = `http://localhost:8080/tables/updateMetadataTable/${budgetTable.name}?budget=${budgetTable.allocated}`;
    try{
      const response=await fetch(url);
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
    }catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => { 
      const fetchData=async () => {  
            await getBudgets();  
      }
      fetchData();
    }, [page]); 

  return (
    <div className="budgets-container">
      <h1>Budgets Overview</h1>

      <div className="budgets-grid">
        {budgets.map((b, index) => {
          const spent = b.allocated - b.remaining;
          const percent = Math.max(0, (spent / b.allocated) * 100);
          const isEditing = editingIndex === index;

          return (
            <div key={index} className="budget-card">

              {/* icon */}
              <div className="budget-header">
                <span className="budget-icon"><b.icon /></span>
                <h3>{b.name}</h3>
              </div>

              <div className="budget-info">
                <p>
                  <span>Allocated:</span>{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      value={b.allocated}
                      autoFocus
                      onChange={(e) => {
                        const value = e.target.value;
                        setBudgets(prev =>
                          prev.map((item, i) =>
                            i === index
                              ? { ...item, allocated: value === "" ? "" : Number(value) }
                              : item
                          )
                        );
                      }}
                      onBlur={async () => {
                        const currentItem = budgets[index];
                        const updatedItem = {
                          ...currentItem,
                          allocated:
                            currentItem.allocated === "" ? 0 : Number(currentItem.allocated),
                        };
                        setBudgets(prev =>
                          prev.map((item, i) =>
                            i === index ? updatedItem : item
                          )
                        );
                        await updateBudgets(updatedItem);
                        setEditingIndex(null);
                        await getBudgets();
                      }}
                      style={{
                        width: "80px",
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    />
                  ) : (
                    <strong
                      onClick={() => setEditingIndex(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {b.allocated} $
                    </strong>
                  )}
                </p>


                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: getColorBySum(b.remaining, b.allocated),
                    }}
                  />
                </div>

                <p>
                  <span>Remaining:</span>{" "}
                  <strong>{b.remaining} $</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {showPagination && (
        <div className="pagination-wrapper">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(numberBudgets / 15)}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        </div>
      )}
    </div>
  );
}

export default BudgetsContent;
