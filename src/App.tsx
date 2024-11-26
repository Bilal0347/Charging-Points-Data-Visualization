import React, { useState, useEffect } from "react";
import InputForm from "./components/InputFormComponents/InputForm";
import { generateDummyData } from "./components/data";
import DashboardDataVisuals from "./components/DataVisualComponents/DashboardDataVisuals";
import { FormData, TimeScale, SimulationData } from "./components/types";

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    numberOfChargePoints: 20,
    arrivalProbabilityMultiplier: 100,
    carConsumptionKWh: 18,
    chargingPowerPerPointKW: 11,
  });

  const [simulationData, setSimulationData] = useState<SimulationData>();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [timeScale, setTimeScale] = useState<TimeScale>("year");

  const timeScaleToDays: Record<TimeScale, number> = {
    day: 1,
    month: 30,
    year: 365,
  };
  const handleFormSubmit = (validatedData: FormData) => {
    console.log(timeScale);
    setFormData(validatedData);
    const results = generateDummyData({
      numberOfChargePoints: validatedData.numberOfChargePoints,
      arrivalProbabilityMultiplier: validatedData.arrivalProbabilityMultiplier,
      chargingPowerPerPointKW: validatedData.chargingPowerPerPointKW,

      daysToSimulate: timeScaleToDays[timeScale],
    });
    setSimulationData(results);
    setSuccessMessage("Simulation successfully generated!");
    setTimeout(() => setSuccessMessage(""), 1000);
  };
  console.log("APp", simulationData);
  return (
    <div className="custom-app min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl font-bold text-center mb-6 mt-5">
        EV Charger Simulation
      </h1>

      <InputForm
        formData={formData}
        onSubmit={handleFormSubmit}
        successMessage={successMessage}
      />

      {simulationData && (
        <DashboardDataVisuals
          simulationData={simulationData}
          formData={formData}
          setTimeScale={setTimeScale}
          timeScale={timeScale}
        />
      )}
    </div>
  );
};

export default App;
