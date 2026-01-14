import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ContentWindow from "./ContentWindow";
import "../styles/windowStyle.css";
import SummaryPanel from "./SummaryPanel";
import AccountsContent from "./AccountsContent";
import BudgetsContent from "./BudgetsContent";
import DashboardGraph from "./DashboardGraph";

function Dashboard() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [netWorth, setNetWorth] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [activeView, setActiveView] = useState("Dashboard");

  async function getNetWorth() {
    const url = `http://localhost:8080/tables/getNetWorth`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setNetWorth(data);
    } catch (error) {
      console.error(error.message);
    }
  }
  const setCashFlowValue=(value) =>{
      setCashFlow(value);
  }
  useEffect(() => {
    const fetchData = async () => {
      await getNetWorth();
    };
    fetchData();
  }, [activeView]);
  const handleViewChange = (viewName) => {
    setActiveView(viewName);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "Accounts":
        return <AccountsContent />;
      case "Dashboard":
        return (
          <>
            <SummaryPanel
              leftCardTitle="Net Worth"
              leftCardText={"$" + netWorth}
              rightCardTitle="Monthly Cash Flow"
              rightCardText={"+$" + cashFlow}
            />

            <h1
              style={{
                marginTop: "40px",
                marginLeft: "400px",
                color: "#ffffff",
                fontSize: "23px",
                fontWeight: 600,
              }}
            >
              Expenses{" "}
            </h1>
            <DashboardGraph setCashFlowValue={setCashFlowValue}/>
          </>
        );
      case "Budgets":
        return <BudgetsContent />;
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

export default Dashboard;
