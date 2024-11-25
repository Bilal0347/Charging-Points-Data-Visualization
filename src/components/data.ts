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
    return { hour: hourIndex, chargepoints, totalPower };
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

  // Peak power load
  const peakPowerLoad = Math.max(
    ...hourlyData.map((entry) => entry.totalPower)
  );

  // Average events per day
  const averageEventsPerDay = Math.floor(totalEvents / daysToSimulate);

  return {
    hourlyData,
    dailyData,
    totalEnergyCharged, // Already an integer
    totalEvents,
    averageEventsPerDay,
    daysToSimulate,
    peakPowerLoad, // Already an integer
  };
};
