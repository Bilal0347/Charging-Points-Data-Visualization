import React, { useState, useEffect } from "react";

interface HeatmapCalenderProps {
  startDate: string;
  endDate: string;
  dataValues: { date: string; count: number; totalPower: number }[];
}

const HeatmapCalender = ({
  startDate,
  endDate,
  dataValues,
}: HeatmapCalenderProps) => {
  const [tooltip, setTooltip] = useState<{
    content: string | null;
    x: number;
    y: number;
  }>({ content: null, x: 0, y: 0 }); // State for tooltip
  const [selectedMetric, setSelectedMetric] = useState<"count" | "totalPower">(
    "count"
  ); // State for dropdown selection

  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);

  const daysInMonth =
    Math.ceil(
      (endingDate.getTime() - startingDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  const calenderGrid = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return date.toISOString().slice(0, 10);
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

  const getGridTemplateRows = () => {
    if (window.innerWidth > 768) {
      return `repeat(10, minmax(0, 1fr))`;
    } else {
      return `repeat(23, minmax(0, 1fr))`;
    }
  };

  const [gridTemplateRows, setGridTemplateRows] = useState(getGridTemplateRows);

  useEffect(() => {
    const handleResize = () => {
      setGridTemplateRows(getGridTemplateRows());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex flex-col items-center heatmapMain">
      {/* Dropdown for Metric Selection */}
      <div className="mb-4 metricSelectionMainDiv">
        <label className="text-gray-300 text-1xl customLabelClass w-full">
          Select Metric of Events and Energy:
        </label>
        <select
          className="h-10 px-6 text-1xl text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 transition duration-200 inputTimeSelection"
          value={selectedMetric}
          onChange={(e) =>
            setSelectedMetric(e.target.value as "count" | "totalPower")
          }
        >
          <option value="count">Number of Events</option>
          <option value="totalPower">Energy Consumption</option>
        </select>
      </div>

      <p className="text-1xl heatmapTitle">
        Heatmap of {selectedMetric === "count" ? "Events" : "Energy"} Per Day
      </p>
      {/* Legend */}
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
      {/* Calendar Grid */}
      <div
        className="grid grid-flow-col gap-1 border rounded p-3 heatMapGrid"
        style={{ gridTemplateRows: gridTemplateRows }}
      >
        {calenderGrid.map((day, index) => {
          const value =
            dataValues.find((item) => item.date === day)?.[selectedMetric] || 0;
          const normalized = normalizeValue(value);
          const color = getColorFromIntensity(normalized);

          return (
            <div
              key={index}
              className="w-4 h-4 rounded cursor-pointer relative"
              style={{
                backgroundColor: value === 0 ? "#ffffff10" : String(color),
              }}
              onMouseEnter={(e) => handleMouseEvent(e, day, value)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleMouseEvent(e, day, value)}
            >
              {tooltip.content ===
                `Date: ${day} - ${
                  selectedMetric === "count"
                    ? "Total Events: "
                    : "Energy Consumed: "
                } ${value}` && ( // Show tooltip only for the active block
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
    </div>
  );
};

export default HeatmapCalender;
