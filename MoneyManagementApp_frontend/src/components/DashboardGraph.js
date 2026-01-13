import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "./DashboardGraphData";
import "../styles/dashboardGraphStyle.css";

/*
Deci @George in DashboardGraphData iti pui datele pe care le vrei, ca si pereche sa fie exact ca acolo
*/

export default function DashboardGraph() {
  return (
    <div className="dashboard-graph">
      <BarChart
        dataset={dataset}
        height={500}
        margin={{ left: 60, right: 20, top: 20, bottom: 40 }}
        series={[
          {
            dataKey: "money",
            valueFormatter,
          },
        ]}
        xAxis={[
          {
            dataKey: "month",
          },
        ]}
        yAxis={[
          // am lasat in caz ca ne mai trebuie
          {
            label: "",
          },
        ]}
        className="dashboard-bar-chart"
      />
    </div>
  );
}
