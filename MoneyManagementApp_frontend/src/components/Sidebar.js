import "../styles/sidebarStyle.css";
import "../components/ButtonComponent";
import ButtonComponent from "../components/ButtonComponent";
import category from "../resources/category.png";
import chart from "../resources/chart-square.png";
import wallet from "../resources/empty-wallet.png";
import graph from "../resources/graph.png";

function Sidebar({isMinimized, setIsMinimized}) {

  const items = [
    { text: "Accounts", icon: wallet },
    { text: "Dashboard", icon: category },
    { text: "Budgets", icon: graph },
    { text: "Reports", icon: chart },
  ];

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  }

  return (
  
    <div className={`sidebar ${isMinimized ? "minimized" : ""}`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        {isMinimized?">>" : "<<"}
      </button>

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

export default Sidebar;
