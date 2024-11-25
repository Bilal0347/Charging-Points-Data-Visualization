import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BarChartComponentProps {
  data: Array<{ name: string; Events: number; "Energy (kWh)": number }>;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Visualizations
      </h3>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Events" fill="#82ca9d" />
        <Bar dataKey="Energy (kWh)" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
