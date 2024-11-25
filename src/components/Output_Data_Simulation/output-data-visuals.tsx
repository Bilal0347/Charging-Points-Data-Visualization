import React from "react";
import {
  BsFillGrid3X3GapFill,
  BsSpeedometer,
  BsBatteryCharging,
  BsLightningFill,
  BsCalendarFill,
} from "react-icons/bs";
import "./style.css";

function OutputDataVisuals({ data, timeScale, onTimeScaleChange }: any) {
  return (
    <main className="main-container flex flex-col items-center justify-center">
      {/* Title */}
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      {/* Time Scale Selection */}
      <div className="mb-4 flex flex-col self-start timeSelectionMainDiv ">
        <label className="text-gray-300 text-1xl top-10 flex flex-row self-start customLabelClass w-full">
          Current Time Scale:
        </label>
        <select
          className="h-10 w-full  px-6 text-1xl text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300  transition duration-200 inputTimeSelection"
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
        {/* Total Days Charged */}
        <div className="card bg-blue-100 p-4 rounded-lg shadow-md">
          <div className="card-inner flex justify-between items-center">
            <h3 className=" text-lg font-semibold">TOTAL DAYS</h3>
            <BsCalendarFill className="card_icon text-3xl" />
          </div>
          <h1 className="text-2xl font-bold  mt-2">
            {data.daysToSimulate || 0}
          </h1>
        </div>

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
      <div className="charts-section mt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Visualizations
        </h3>

        {/* Placeholder for future charts */}
        <div className="chart-placeholder bg-gray-100 h-64 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Charts will appear here.</p>
        </div>
      </div>
    </main>
  );
}

export default OutputDataVisuals;
