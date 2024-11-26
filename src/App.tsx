import React, { useState } from "react";
import InputForm from "./components/InputFormComponents/InputForm";
import { generateDummyData } from "./components/data";
import DashboardDataVisuals from "./components/DataVisualComponents/DashboardDataVisuals";
import {
  ErrorData,
  FormData,
  TimeScale,
  SimulationData,
} from "./components/types";

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    numberOfChargePoints: 20,
    arrivalProbabilityMultiplier: 100,
    carConsumptionKWh: 18,
    chargingPowerPerPointKW: 11,
  });

  const [formErrors, setFormErrors] = useState<ErrorData>({
    numberOfChargePointsError: "",
    arrivalProbabilityMultiplierError: "",
    carConsumptionKWhError: "",
    chargingPowerPerPointKWError: "",
  });

  const [simulationData, setSimulationData] = useState<SimulationData>();
  const [timeScale, setTimeScale] = useState<TimeScale>("year");

  // Map time scale to simulation days
  const timeScaleToDays: Record<TimeScale, number> = {
    day: 1,
    month: 30,
    year: 365,
  };
  // Validate individual field
  const validateField = (field: keyof FormData, value: number): string => {
    switch (field) {
      case "numberOfChargePoints":
        return value <= 0 || value > 100
          ? "Number of charge points must be between 1 and 100."
          : "";
      case "arrivalProbabilityMultiplier":
        return value < 20 || value > 200
          ? "Arrival probability multiplier must be between 20% and 200%."
          : "";
      case "carConsumptionKWh":
        return value <= 0 ? "Car consumption must be greater than 0." : "";
      case "chargingPowerPerPointKW":
        return value <= 0
          ? "Charging power per point must be greater than 0."
          : "";
      default:
        return "";
    }
  };

  // Validate entire form
  const validateForm = (data: FormData): ErrorData => {
    const newErrors: ErrorData = {
      numberOfChargePointsError: "",
      arrivalProbabilityMultiplierError: "",
      carConsumptionKWhError: "",
      chargingPowerPerPointKWError: "",
    };

    Object.keys(data).forEach((key) => {
      const field = key as keyof FormData;
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[`${field}Error` as keyof ErrorData] = error;
      }
    });

    return newErrors;
  };

  // Handle change for form input fields
  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [field]: value };
        setFormErrors(validateForm(updatedData)); // Validate after each change
        return updatedData;
      });
    };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData); // Validate on submit
    if (Object.values(errors).every((error) => error === "")) {
      const results = generateDummyData({
        numberOfChargePoints: formData.numberOfChargePoints,
        arrivalProbabilityMultiplier: formData.arrivalProbabilityMultiplier,
        chargingPowerPerPointKW: formData.chargingPowerPerPointKW,
        daysToSimulate: timeScaleToDays[timeScale], // Adjust simulation days based on selection
      });
      setSimulationData(results); // Update simulation data
    } else {
      setFormErrors(errors); // Set errors if form is invalid
    }
  };

  // Handle time scale change for the output
  const handleTimeScaleChange = (newScale: TimeScale) => {
    setTimeScale(newScale);
    const updatedData = generateDummyData({
      numberOfChargePoints: formData.numberOfChargePoints,
      arrivalProbabilityMultiplier: formData.arrivalProbabilityMultiplier,
      chargingPowerPerPointKW: formData.chargingPowerPerPointKW,
      daysToSimulate: timeScaleToDays[newScale], // Update simulation with new time scale
    });
    setSimulationData(updatedData);
  };

  const isFormValid = Object.values(formErrors).every((error) => error === "");

  return (
    <div className="app min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        EV Charger Simulation
      </h1>
      <InputForm
        formData={formData}
        formErrors={formErrors}
        onInputChange={handleInputChange}
        onFormSubmit={handleFormSubmit}
        isFormValid={isFormValid}
      />

      {simulationData && (
        <DashboardDataVisuals
          simulationData={simulationData}
          timeScale={timeScale}
          onTimeScaleChange={handleTimeScaleChange}
        />
      )}
    </div>
  );
};

export default App;
