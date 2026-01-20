import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../styles/dashboardGraphStyle.css";
import { Box } from "@mui/material";

/*
Deci @George in DashboardGraphData iti pui datele pe care le vrei, ca si pereche sa fie exact ca acolo
*/




export default function DashboardGraph({setCashFlowValue}) {
  const [cashFlowPerMonth, setCashFlowPerMonth] = useState([]);

  async function getCashFlowPerMonth() {
    const url = `http://localhost:8080/tables/getCashFlow`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log(data);
      
      setCashFlowPerMonth(data);
      setCashFlowValue(data.JANUARY);
      
    } catch (error) {
      console.error(error.message);
    }
  }
  
  useEffect(() => {
      const fetchData = async () => {
        await getCashFlowPerMonth();
        
      };
      fetchData();
  }, []);


  const dataset = [
    {
      money: cashFlowPerMonth.JANUARY ? cashFlowPerMonth.JANUARY : 0,
      month: "Jan",
    },
    {
      money: cashFlowPerMonth.FEBRUARY ? cashFlowPerMonth.FEBRUARY : 0,
      month: "Feb",
    },
    {
      money: cashFlowPerMonth.MARCH ? cashFlowPerMonth.MARCH : 0,
      month: "Mar",
    },
    {
      money: cashFlowPerMonth.APRIL ? cashFlowPerMonth.APRIL : 0,
      month: "Apr",
    },
    {
      money: cashFlowPerMonth.MAY ? cashFlowPerMonth.MAY : 0,
      month: "May",
    },
    {
      money: cashFlowPerMonth.JUNE ? cashFlowPerMonth.JUNE : 0,
      month: "June",
    },
    {
      money: cashFlowPerMonth.JULY ? cashFlowPerMonth.JULY : 0,
      month: "July",
    },
    {
      money: cashFlowPerMonth.AUGUST ? cashFlowPerMonth.AUGUST : 0,
      month: "Aug",
    },
    {
      money: cashFlowPerMonth.SEPTEMBER ? cashFlowPerMonth.SEPTEMBER : 0,
      month: "Sept",
    },
    {
      money: cashFlowPerMonth.OCTOBER ? cashFlowPerMonth.OCTOBER : 0,
      month: "Oct",
    },
    {
      money: cashFlowPerMonth.NOVEMBER ? cashFlowPerMonth.NOVEMBER : 0,
      month: "Nov",
    },
    {
      money: cashFlowPerMonth.DECEMBER ? cashFlowPerMonth.DECEMBER : 0,
      month: "Dec",
    },
  ];

  function valueFormatter(value) {
    return `$${value}`;
  }


  return (
    <div className="dashboard-graph">
      <BarChart
        dataset={dataset}
        height={500}
        margin={{ left: 60, right: 20, top: 20, bottom: 40 }}
         sx={{'.MuiChartsAxis-root .MuiChartsAxis-line': { stroke: "white" } }}
        series={[
          {
            dataKey: "money",
            valueFormatter,
          },
        ]}
        xAxis={[
          {
            dataKey: "month",
            tickLabelStyle: {
              fill: "#ffffff", 
            },
          
          },
        ]}
        yAxis={[
          // am lasat in caz ca ne mai trebuie
          {
            label: "",
            tickLabelStyle:{fill:"white"}
          },
        ]}
        className="dashboard-bar-chart"
      />
    </div>
  );
}
