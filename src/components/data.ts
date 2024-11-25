export const generateDummyData = ({
  numberOfChargePoints,
  arrivalProbabilityMultiplier,
  chargingPowerPerPoint_kW,
  daysToSimulate,
}: {
  numberOfChargePoints: number;
  arrivalProbabilityMultiplier: number; // As percentage
  chargingPowerPerPoint_kW: number;
  daysToSimulate: number;
}) => {
  const hoursPerDay = 24;
  const daysPerMonth = 30; // Assume 30 days in a month for simulation
  const totalHours = hoursPerDay * daysToSimulate;

  // Simulate hourly data
  const hourlyData = Array.from({ length: totalHours }, (_, hourIndex) => {
    const chargepoints = Array.from({ length: numberOfChargePoints }, () => {
      const isCharging = Math.random() < arrivalProbabilityMultiplier / 100; // Arrival probability
      return isCharging
        ? Math.floor(Math.random() * chargingPowerPerPoint_kW) // Random power as int (0 to max)
        : 0;
    });
    const totalPower = chargepoints.reduce((sum, power) => sum + power, 0);
    const events = chargepoints.filter((power) => power > 0).length;
    return { hour: hourIndex, chargepoints, totalPower, events };
  });

  // Calculate total energy charged (kWh)
  const totalEnergyCharged = hourlyData.reduce(
    (total, entry) => total + entry.totalPower,
    0
  );

  // Calculate number of charging events
  const totalEvents = hourlyData.reduce(
    (total, entry) =>
      total + entry.chargepoints.filter((power) => power > 0).length,
    0
  );

  // Group by day for aggregation
  const dailyData = Array.from({ length: daysToSimulate }, (_, dayIndex) => {
    const dailyEntries = hourlyData.slice(
      dayIndex * hoursPerDay,
      (dayIndex + 1) * hoursPerDay
    );
    const dailyTotalPower = dailyEntries.reduce(
      (sum, entry) => sum + entry.totalPower,
      0
    );
    const dailyEvents = dailyEntries.reduce(
      (count, entry) =>
        count + entry.chargepoints.filter((power) => power > 0).length,
      0
    );
    return {
      day: dayIndex + 1,
      totalPower: dailyTotalPower,
      events: dailyEvents,
    };
  });

  // Transform daily data for heatmap compatibility
  const heatmapData = Array.from({ length: 365 }, (_, dayIndex) => {
    const date = new Date();
    date.setFullYear(2024); // Assume starting from 2024
    date.setMonth(0); // Start from January
    date.setDate(dayIndex + 1); // Set the date to the current day in the year

    const formattedDate = date.toISOString().split("T")[0]; // Format to YYYY-MM-DD

    // Check if the date is within the simulation range, and add events from the dailyData
    const simulatedDay = dailyData.find((item) => item.day === dayIndex + 1);
    const events = simulatedDay ? simulatedDay.events : 0;

    return {
      date: formattedDate, // Date in the required format
      count: events, // Event count for that date
    };
  });

  // Group by month for aggregation
  const monthsToSimulate = Math.floor(daysToSimulate / daysPerMonth); // Number of months to simulate
  const monthlyData = Array.from(
    { length: monthsToSimulate },
    (_, monthIndex) => {
      const monthStartDay = monthIndex * daysPerMonth;
      const monthEndDay = Math.min(
        (monthIndex + 1) * daysPerMonth,
        daysToSimulate
      );
      const monthlyEntries = dailyData.slice(monthStartDay, monthEndDay);
      const monthlyTotalPower = monthlyEntries.reduce(
        (sum, entry) => sum + entry.totalPower,
        0
      );
      const monthlyEvents = monthlyEntries.reduce(
        (count, entry) => count + entry.events,
        0
      );
      return {
        month: monthIndex + 1,
        totalPower: monthlyTotalPower,
        events: monthlyEvents,
      };
    }
  );

  // Peak power load
  const peakPowerLoad = Math.max(
    ...hourlyData.map((entry) => entry.totalPower)
  );

  // Average events per day
  const averageEventsPerDay = Math.floor(totalEvents / daysToSimulate);
  console.log("heatmap data", heatmapData);
  return {
    hourlyData,
    dailyData,
    monthlyData, // Add monthlyData to the output
    totalEnergyCharged, // Already an integer
    totalEvents,
    averageEventsPerDay,
    daysToSimulate,
    peakPowerLoad, // Already an integer
    heatmapData, // Add heatmapData to the output
  };
};
