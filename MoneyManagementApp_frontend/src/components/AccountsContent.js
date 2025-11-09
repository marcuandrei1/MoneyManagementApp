import "../styles/accountsContentStyle.css";

function AccountsContent() {
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

  return (
    <div className="accounts-container">
      <div className="accounts-header">
        <h2>Transactions</h2>
        <button className="add-transaction-btn">+ Add Transaction</button>
      </div>

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
          {transactions.map((item, index) => (
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
