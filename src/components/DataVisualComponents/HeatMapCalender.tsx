import React, { useState, useEffect } from "react";
import { HeatmapCalendarProps } from "../types";

const HeatmapCalendar = ({
  startDate,
  endDate,
  dataValues,
}: HeatmapCalendarProps) => {
  const [tooltip, setTooltip] = useState<{
    content: string | null;
    x: number;
    y: number;
  }>({
    content: null,
    x: 0,
    y: 0,
  });

  const [selectedMetric, setSelectedMetric] = useState<"count" | "totalPower">(
    "count"
  );

  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);

  const calendarGrid = Array.from({ length: 12 }, (_, monthIndex) => {
    const monthStart = new Date(startingDate.getFullYear(), monthIndex, 1);
    const monthEnd = new Date(startingDate.getFullYear(), monthIndex + 1, 0);

    // Ensure we don't go past the ending date
    if (monthStart > endingDate) return [];

    // Handle the case where the month partially overlaps with the range
    const daysInMonth = [];
    for (
      let d = new Date(monthStart);
      d <= monthEnd && d <= endingDate;
      d.setDate(d.getDate())
    ) {
      daysInMonth.push(d.toISOString().slice(0, 10));
    }
    return daysInMonth;
  });
  const selectedValues = dataValues.map((item) =>
    selectedMetric === "count" ? item.count : item.totalPower
  );

  const minValue = Math.min(...selectedValues);
  const maxValue = Math.max(...selectedValues);

  const normalizeValue = (value: number): number => {
    return maxValue === minValue
      ? 0
      : (value - minValue) / (maxValue - minValue);
  };

  const getColorFromIntensity = (normalized: number): string => {
    const colorCodes = [
      "#FFEEEE",
      "#FFDDDD",
      "#FFCCCC",
      "#FFBBBB",
      "#FFAAAA",
      "#FF9999",
      "#FF8888",
      "#FF7777",
      "#FF6666",
      "#FF5555",
      "#FF4444",
    ];

    const colorIndex = Math.min(
      Math.floor(normalized * 10),
      colorCodes.length - 1
    );
    return colorCodes[colorIndex];
  };

  const handleMouseEvent = (
    event: React.MouseEvent<HTMLDivElement>,
    day: string,
    value: number
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      content: `Date: ${day} - ${
        selectedMetric === "count" ? "Total Events: " : "Energy Consumed: "
      } ${value}`,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ content: null, x: 0, y: 0 });
  };

  const monthLabels = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "short" })
  );

  return (
    <div className="relative flex flex-col items-center heat-map-main">
      <div className="mb-4 metric-selection-main-div">
        <label className="text-gray-300 text-xl custom-label-class w-full">
          Select Metric of Events and Energy:
        </label>
        <select
          className="h-10 px-6 text-xl text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200 input-time-selection"
          value={selectedMetric}
          onChange={(e) =>
            setSelectedMetric(e.target.value as "count" | "totalPower")
          }
        >
          <option value="count">Number of Events</option>
          <option value="totalPower">Energy Consumption</option>
        </select>
      </div>
      <p className="text-xl heat-map-title">
        Heatmap of {selectedMetric === "count" ? "Events" : "Energy"} Per Day
      </p>
      <div className="flex justify-center mb-4">
        <span className="flex items-center mr-4">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 mr-2"></div>
          <span>No Activity</span>
        </span>
        <span className="flex items-center mr-4">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: getColorFromIntensity(0.5) }}
          ></div>
          <span>Moderate</span>
        </span>
        <span className="flex items-center">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: getColorFromIntensity(1) }}
          ></div>
          <span>High Activity</span>
        </span>
      </div>

      <div
        className="grid gap-3 border rounded p-3 heat-map-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(12, 1fr)`, // 12 columns for months
        }}
      >
        {calendarGrid.map((daysInMonth, monthIndex) => (
          <div key={monthIndex} className="heat-map-column">
            <div className="text-center font-bold mb-2">
              {monthLabels[monthIndex]}
            </div>
            {daysInMonth.map((day, index) => {
              const value =
                dataValues.find((item) => item.date === day)?.[
                  selectedMetric
                ] || 0;
              const normalized = normalizeValue(value);
              const color = getColorFromIntensity(normalized);

              return (
                <div
                  key={index}
                  className="w-8 h-8 rounded cursor-pointer relative mb-1"
                  style={{
                    backgroundColor: value === 0 ? "#ffffff10" : color,
                  }}
                  onMouseEnter={(e) => handleMouseEvent(e, day, value)}
                  onMouseLeave={handleMouseLeave}
                >
                  {tooltip.content ===
                    `Date: ${day} - ${
                      selectedMetric === "count"
                        ? "Total Events: "
                        : "Energy Consumed: "
                    } ${value}` && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        zIndex: 10,
                      }}
                    >
                      {tooltip.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatmapCalendar;
