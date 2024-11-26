export interface FormData {
  numberOfChargePoints: number;
  arrivalProbabilityMultiplier: number;
  carConsumptionKWh: number;
  chargingPowerPerPointKW: number;
}

export interface ErrorData {
  numberOfChargePointsError: string;
  arrivalProbabilityMultiplierError: string;
  carConsumptionKWhError: string;
  chargingPowerPerPointKWError: string;
}

export type TimeScale = "day" | "month" | "year";

export interface SimulationData {
  averageEventsPerDay: number;
  daysToSimulate: number;
  peakPowerLoad: number;
  totalEnergyCharged: number;
  totalEvents: number;
  dailyData: Array<{
    day: number;
    events: number;
    totalPower: number;
  }>;
  monthlyData: Array<{
    month: number;
    events: number;
    totalPower: number;
  }>; // Data for each simulated month
  hourlyData: Array<{
    hour: number;
    events: number;
    totalPower: number;
    chargepoints: number[];
  }>; // Data for each simulated hour
  heatmapData: Array<{
    date: string;
    count: number;
    totalPower: number;
  }>;
}

export interface HeatmapCalendarProps {
  startDate: string;
  endDate: string;
  dataValues: { date: string; count: number; totalPower: number }[];
}

export interface BarChartProps {
  data: Array<{ name: string; Events: number; Energy: number }>;
}
