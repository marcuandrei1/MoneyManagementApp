import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ContentWindow from "./ContentWindow";
import "../styles/windowStyle.css";
import SummaryPanel from "./SummaryPanel";
import AccountsContent from "./AccountsContent";

function Window() {
  const [isMinimized, setIsMinimized] = useState(false);

  const [activeView, setActiveView] = useState("Dashboard");

  const handleViewChange = (viewName) => {
    setActiveView(viewName);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "Accounts":
        return <AccountsContent />;
      case "Dashboard":
        return (
          <SummaryPanel
            leftCardTitle="Net Worth"
            leftCardText="$2,120"
            rightCardTitle="Monthly Cash Flow"
            rightCardText="+$120"
          />
        );
      case "Budgets":
        return <div style={{ color: "white" }}>Budgets Content Goes Here</div>; // Replace with <Budgets />
      case "Reports":
        return <div style={{ color: "white" }}>Reports Content Goes Here</div>; // Replace with <Reports />
      default:
        return (
          <div style={{ color: "white" }}>Dashboard Content Goes Here</div>
        );
    }
  };

  return (
    <div className={`window ${isMinimized ? "sidebar-minimized" : ""}`}>
      <Topbar />
      <Sidebar
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        onViewChange={handleViewChange}
      />

      <ContentWindow>{renderActiveView()}</ContentWindow>
    </div>
  );
}

export default Window;
