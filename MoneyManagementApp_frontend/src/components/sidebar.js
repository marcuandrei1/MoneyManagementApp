import "../styles/sidebarStyle.css";
import "../components/buttonComponent";
import buttonComponent from "../components/buttonComponent";

function sidebar() {
  const items = [
    buttonComponent("Accounts"),
    buttonComponent("Dashboard"),
    buttonComponent("Budgets"),
    buttonComponent("Reports"),
  ];

  return (
    <div className="sidebar">
      <ul className="list-group">
        {items.map((item) => (
          <li className={`list-group-${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default sidebar;
