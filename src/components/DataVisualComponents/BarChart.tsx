import React, { useState, useEffect } from "react";
import { BarChartProps } from "../types";

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // Responsive chart dimensions
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  // Handle window resize to adjust chart dimensions
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chart dimensions
  const width = Math.min(800, windowWidth - 20);
  const height = Math.min(400, windowWidth * 0.5);
  const padding = 50;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  // Calculate max values for scaling
  const maxEvents = Math.max(...data.map((item) => item.Events));
  const maxEnergy = Math.max(...data.map((item) => item.Energy));
  const maxValue = Math.max(maxEvents, maxEnergy);

  // Scale function
  const scaleValue = (value: number) => (value / maxValue) * chartHeight;

  // Bar dimensions
  const barWidth = chartWidth / (data.length * 3);
  const barSpacing = chartWidth / data.length;

  const handleMouseEnter = (x: number, y: number, content: string) => {
    setTooltip({ x, y, content });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-xl">Bar Chart: Events and Energy (KWh)</p>
      <div
        style={{
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              pointerEvents: "none",
              fontSize: "9px",
              transform: "translate(-50%, 50%)", // Center above the bar
            }}
          >
            {tooltip.content}
          </div>
        )}

        <svg
          width={width - 20}
          height={height}
          className="border rounded pl-2 custom-bar-chart-svg"
        >
          {/* Axes */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="white"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="white"
          />

          {/* X-Axis Labels */}
          {data.map((item, index) => {
            const x = padding + index * barSpacing + barWidth;

            // Show labels based on width
            const shouldShowLabel =
              windowWidth > 600 || index % Math.ceil(data.length / 12) === 0;

            return (
              shouldShowLabel && (
                <text
                  key={index}
                  x={x}
                  y={height - padding + 20}
                  textAnchor="middle"
                  fontSize={Math.max(10, width * 0.015)} // Dynamically adjust font size
                  fill="white"
                >
                  {item.name}
                </text>
              )
            );
          })}

          {/* Bars */}
          {data.map((item, index) => {
            const xStart = padding + index * barSpacing;

            // Event Bar
            const eventsBarHeight = scaleValue(item.Events);
            const eventsY = height - padding - eventsBarHeight;

            // Energy Bar
            const energyBarHeight = scaleValue(item.Energy);
            const energyY = height - padding - energyBarHeight;

            return (
              <g key={index}>
                {/* Events Bar */}
                <rect
                  x={xStart}
                  y={eventsY}
                  width={barWidth}
                  height={eventsBarHeight}
                  fill="#82ca9d"
                  onMouseEnter={() =>
                    handleMouseEnter(
                      xStart + barWidth + 5 + barWidth / 2,
                      energyY,
                      `Events: ${item.Events}`
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
                {/* Energy Bar */}
                <rect
                  x={xStart + barWidth + 5}
                  y={energyY}
                  width={barWidth}
                  height={energyBarHeight}
                  fill="#8884d8"
                  onMouseEnter={() =>
                    handleMouseEnter(
                      xStart + barWidth + 5 + barWidth / 2,
                      energyY,
                      `Energy: ${item.Energy}`
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </g>
            );
          })}

          {/* Legends */}
          <g>
            <rect
              x={width - 140}
              y={padding - 40}
              width={20}
              height={10}
              fill="#82ca9d"
            />
            <text
              x={width - 110}
              y={padding - 30}
              fontSize={Math.max(10, width * 0.015)}
              fill="white"
            >
              Events
            </text>
            <rect
              x={width - 140}
              y={padding - 20}
              width={20}
              height={10}
              fill="#8884d8"
            />
            <text
              x={width - 110}
              y={padding - 10}
              fontSize={Math.max(10, width * 0.015)}
              fill="white"
            >
              Energy (KWh)
            </text>
          </g>

          {/* Y-Axis Labels */}
          {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
            const value = (maxValue / 5) * i;
            const y = height - padding - (chartHeight / 5) * i;

            return (
              <text
                key={i}
                x={padding - 10}
                y={y + 5}
                textAnchor="end"
                fontSize={Math.max(10, width * 0.015)}
                fill="white"
              >
                {Math.round(value)}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default BarChart;
