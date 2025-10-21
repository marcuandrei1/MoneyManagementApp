import "../styles/sidebarStyle.css";

function sidebar() {
  const items = ["Accounts", "Dashboard", "Budgets", "Reports"];

  return (
    <div className="sidebar">
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default sidebar;
