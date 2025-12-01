import React from "react";
import {
  FaShoppingCart,
  FaCar,
  FaTshirt,
  FaBolt,
  FaPlane,
} from "react-icons/fa";
import "../styles/budgetsContent.css";

function getColorBySum(remaining, allocated) {
  const ratio = remaining / allocated; // intre 0 si 1
  const red = Math.floor((1 - ratio) * 255);
  const green = Math.floor(ratio * 255);

  return `rgb(${red}, ${green}, 50)`;
}

const icons = {
  FOOD: <FaShoppingCart />,
  CAR: <FaCar />,
  CLOTHING: <FaTshirt />,
  BILLS: <FaBolt />,
  TRAVEL: <FaPlane />,
  ANYTHING_ELSE: <FaBolt />,
};

function BudgetsContent() {
  // pentru cand luam din baza de date
  // const [budgets, setBudgets] = useState([]);

  const budgets = [
    {
      icon: <FaShoppingCart />,
      name: "FOOD",
      allocated: 500,
      remaining: 120,
    },
    {
      icon: <FaCar />,
      name: "CAR",
      allocated: 300,
      remaining: 81,
    },
    {
      icon: <FaTshirt />,
      name: "CLOTHING",
      allocated: 500,
      remaining: 120,
    },
    {
      icon: <FaBolt />,
      name: "Bills",
      allocated: 500,
      remaining: 444,
    },
  ];

  return (
    <div className="budgets-container">
      <h1>Budgets Overview</h1>

      <div className="budgets-grid">
        {budgets.map((b, index) => {
          const spent = b.allocated - b.remaining;
          const percent = (spent / b.allocated) * 100;

          return (
            <div key={index} className="budget-card">
              <div className="budget-header">
                <span className="budget-icon">{b.icon}</span>
                <h3>{b.name}</h3>
              </div>

              <div className="budget-info">
                <p>
                  <span>Allocated:</span> <strong>{b.allocated} $</strong>
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: getColorBySum(b.remaining, b.allocated),
                    }}
                  ></div>
                </div>

                <p>
                  <span>Remaining:</span> <strong>{b.remaining} $</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetsContent;
