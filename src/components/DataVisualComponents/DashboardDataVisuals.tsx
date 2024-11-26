import React, { useMemo } from "react";
import {
  BsFillGrid3X3GapFill,
  BsSpeedometer,
  BsBatteryCharging,
  BsLightningFill,
} from "react-icons/bs";
import BarChartComponent from "./BarChart";
import HeatmapCalendar from "./HeatMapCalender";
import { TimeScale, DashboardDataVisualsProps } from "../types";
import "./output-style.css";

// Define type for simulation data

// Define props for the DashboardDataVisuals component

const DashboardDataVisuals: React.FC<DashboardDataVisualsProps> = ({
  simulationData,
  timeScale,
  onTimeScaleChange,
}) => {
  // Generate chart data based on the selected time scale
  const chartData = useMemo(() => {
    const formatHour = (hour: number) =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        hour12: false,
      }).format(new Date(0, 0, 0, hour));

    const formatMonth = (month: number) =>
      new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        new Date(0, month - 1)
      );

    const formatDay = (day: number) =>
      new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(
        new Date(2024, 0, day)
      );

    let lastLabel: string | null = null;

    const getUniqueLabel = (label: string) => {
      if (label !== lastLabel) {
        lastLabel = label;
        return label;
      }
      return "";
    };

    switch (timeScale) {
      case "day":
        return simulationData.hourlyData.map(
          ({ hour, events, totalPower }) => ({
            name: getUniqueLabel(formatHour(hour)),
            Events: events,
            Energy: totalPower,
          })
        );
      case "month":
        return simulationData.dailyData.map(({ day, events, totalPower }) => ({
          name: getUniqueLabel(formatDay(day)),
          Events: events,
          Energy: totalPower,
        }));
      case "year":
        return simulationData.monthlyData.map(
          ({ month, events, totalPower }) => ({
            name: getUniqueLabel(formatMonth(month)),
            Events: events,
            Energy: totalPower,
          })
        );
      default:
        return [];
    }
  }, [timeScale, simulationData]);

  return (
    <main className="main-container flex flex-col items-center justify-center">
      {/* Title */}
      <div className="main-title">
        <h3 className="text-4xl font-bold">Dashboard</h3>
      </div>

      {/* Time Scale Selection */}

      <div className="mb-4 time-selection">
        <label className="text-gray-300 text-xl custom-label-class w-full">
          Select Time Scale:
        </label>
        <select
          className="h-10 px-6 text-xl text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200 input-time-selection"
          value={timeScale}
          onChange={(e) => onTimeScaleChange(e.target.value as TimeScale)}
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="main-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-blue-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className="text-lg font-semibold">Total Energy (kWh)</h3>
            <BsBatteryCharging className="card-icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold mt-2">
            {simulationData.totalEnergyCharged || 0}
          </h1>
        </div>

        <div className="card bg-green-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className="text-lg font-semibold">Total Events</h3>
            <BsFillGrid3X3GapFill className="card-icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold mt-2">
            {simulationData.totalEvents || 0}
          </h1>
        </div>

        <div className="card bg-red-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className="text-lg font-semibold">Peak Power Load (kW)</h3>
            <BsLightningFill className="card-icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold mt-2">
            {simulationData.peakPowerLoad || 0}
          </h1>
        </div>

        <div className="card bg-fuchsia-900 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className="text-lg font-semibold">Average Events/Day</h3>
            <BsSpeedometer className="card-icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold mt-2">
            {simulationData.averageEventsPerDay || 0}
          </h1>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section flex flex-col items-center justify-center mt-10">
        <BarChartComponent data={chartData} />
        <HeatmapCalendar
          startDate={"2024-01-01"}
          endDate={"2024-12-31"}
          dataValues={simulationData.heatmapData}
        />
      </div>
    </main>
  );
};

export default DashboardDataVisuals;
