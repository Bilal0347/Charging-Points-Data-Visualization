import React from "react";
import BarChartComponent from "./bar-chart";
// import HeatmapComponent from "./heatmap";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import "./style.css";

function OutputDataVisuals() {
  const data = [
    {
      date: "2024-11-20",
      energyCharged: 45, // kWh
      chargingEvents: 12,
      maxPowerDemand: 5.5, // kW
    },
    {
      date: "2024-11-21",
      energyCharged: 50,
      chargingEvents: 15,
      maxPowerDemand: 6.0,
    },
    {
      date: "2024-11-22",
      energyCharged: 40,
      chargingEvents: 10,
      maxPowerDemand: 4.5,
    },
    {
      date: "2024-11-23",
      energyCharged: 60,
      chargingEvents: 18,
      maxPowerDemand: 7.0,
    },
    {
      date: "2024-11-24",
      energyCharged: 55,
      chargingEvents: 16,
      maxPowerDemand: 6.5,
    },
  ];

  // Transform data for Heatmap
  const heatmapData = data.map((item) => ({
    date: item.date,
    value: item.maxPowerDemand,
  }));

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      {/* Summary Cards */}
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL ENERGY (kWh)</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{data.reduce((acc, curr) => acc + curr.energyCharged, 0)}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL EVENTS</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{data.reduce((acc, curr) => acc + curr.chargingEvents, 0)}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>HIGHEST POWER DEMAND (kW)</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{Math.max(...data.map((d) => d.maxPowerDemand))}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>AVERAGE ENERGY/DAY</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>
            {(
              data.reduce((acc, curr) => acc + curr.energyCharged, 0) /
              data.length
            ).toFixed(2)}
          </h1>
        </div>
      </div>

      {/* Charts */}
      <BarChartComponent data={data} />
      {/* <HeatmapComponent data={heatmapData} /> */}
    </main>
  );
}

export default OutputDataVisuals;
