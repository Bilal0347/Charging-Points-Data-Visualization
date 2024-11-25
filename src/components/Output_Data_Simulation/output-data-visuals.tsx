import React from "react";
import {
  BsFillGrid3X3GapFill,
  BsSpeedometer,
  BsBatteryCharging,
  BsLightningFill,
  BsCalendarFill,
} from "react-icons/bs";
import BarChartComponent from "./bar-chart";
import HeatmapCalender from "./heat-map-calender";

import "./style.css";

function OutputDataVisuals({ data, timeScale, onTimeScaleChange }: any) {
  const chartData = React.useMemo(() => {
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
      ); // Adjust year and month as needed

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
        // Hourly data when timeScale is "day"
        return data.hourlyData.map((hour: any) => ({
          name: getUniqueLabel(formatHour(hour.hour)),
          Events: hour.events,
          Energy: hour.totalPower,
        }));

      case "month":
        // Daily data when timeScale is "month"
        return data.dailyData.map((day: any) => ({
          name: getUniqueLabel(formatDay(day.day)),
          Events: day.events,
          Energy: day.totalPower,
        }));

      case "year":
        // Monthly data when timeScale is "year"
        return data.monthlyData.map((month: any) => ({
          name: getUniqueLabel(formatMonth(month.month)),
          Events: month.events,
          Energy: month.totalPower,
        }));

      default:
        return [];
    }
  }, [timeScale, data]);

  // This function transforms the data to fit the heatmap's expected structure
  return (
    <main className="main-container flex flex-col items-center justify-center">
      {/* Title */}
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      {/* Time Scale Selection */}
      <div className="mb-4  timeSelectionMainDiv ">
        <label className="text-gray-300 text-1xl top-10  customLabelClass w-full">
          Current Time Scale:
        </label>
        <select
          className="h-10   px-6 text-1xl text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300  transition duration-200 inputTimeSelection"
          value={timeScale}
          onChange={(e) =>
            onTimeScaleChange(e.target.value as "day" | "month" | "year")
          }
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      {/* Summary Cards */}
      <div className="main-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Days Charged
        <div className="card bg-blue-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className=" text-lg font-semibold">TOTAL DAYS</h3>
            <BsCalendarFill className="card_icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold  mt-2">
            {data.daysToSimulate || 0}
          </h1>
        </div> */}
        {/* Total Energy Charged */}
        <div className="card bg-blue-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className=" text-lg font-semibold">TOTAL ENERGY (kWh)</h3>
            <BsBatteryCharging className="card_icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold  mt-2">
            {data.totalEnergyCharged || 0}
          </h1>
        </div>
        {/* Total Events */}
        <div className="card bg-green-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className=" text-lg font-semibold">TOTAL EVENTS</h3>
            <BsFillGrid3X3GapFill className="card_icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold mt-2">{data.totalEvents || 0}</h1>
        </div>
        {/* Peak Power Load */}
        <div className="card bg-red-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className="text-lg font-semibold">PEAK POWER LOAD (kW)</h3>
            <BsLightningFill className="card_icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold  mt-2">
            {data.peakPowerLoad || 0}
          </h1>
        </div>
        {/* Average Events Per Day */}
        <div className="card bg-fuchsia-900 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className=" text-lg font-semibold">AVERAGE EVENTS/DAY</h3>
            <BsSpeedometer className="card_icon  text-3xl" />
          </div>
          <h1 className="text-2xl font-bold  mt-2">
            {data.averageEventsPerDay || 0}
          </h1>
        </div>
      </div>
      {/* Charts Section */}
      <div className="flex flex-col items-center justify-center">
        {/* Bar Chart Component */}
        <BarChartComponent data={chartData} />
        <HeatmapCalender
          startDate={"2024-01-01"}
          endDate={"2024-12-30"}
          dataValues={data.heatmapData}
        />
      </div>
    </main>
  );
}

export default OutputDataVisuals;
