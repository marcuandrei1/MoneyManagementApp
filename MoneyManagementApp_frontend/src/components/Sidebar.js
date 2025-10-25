import "../styles/sidebarStyle.css";
import "../components/buttonComponent";
import ButtonComponent from "../components/buttonComponent";

function sidebar() {
  const items = [
    { text: "Accounts", icon: "/resources/category.png" },
    { text: "Dashboard", icon: "/resources/chart-square.png" },
    { text: "Budgets", icon: "/resources/empty-wwallet.png" },
    { text: "Reports", icon: "/resources/graph.png" },
  ];

  return (
    <div className="sidebar">
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            <ButtonComponent text={item.text} icon={item.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default sidebar;
