import React, { useState } from "react";
import Form from "./components/Input_Form/input-form";
import { generateDummyData } from "./components/data";
import OutputDataVisuals from "./components/Output_Data_Simulation/output-data-visuals";

const App = () => {
  const [formData, setFormData] = useState({
    numberOfChargePoints: 20,
    arrivalProbabilityMultiplier: 100, // Stored as percentage
    carConsumption_kWh: 18,
    chargingPowerPerPoint_kW: 11,
  });

  const [errors, setErrors] = useState({
    numberOfChargePoints: "",
    arrivalProbabilityMultiplier: "",
    carConsumption_kWh: "",
    chargingPowerPerPoint_kW: "",
  });

  const [simulationData, setSimulationData] = useState<any>(null); // Store the generated data
  const [timeScale, setTimeScale] = useState<"day" | "month" | "year">("year");

  // Map time scale to simulation days
  const timeScaleToDays = {
    day: 1,
    month: 30,
    year: 365,
  };

  // Validate individual field
  const validateField = (
    field: keyof typeof formData,
    value: number
  ): string => {
    switch (field) {
      case "numberOfChargePoints":
        return value <= 0 || value > 100
          ? "Number of charge points must be between 1 and 100."
          : "";
      case "arrivalProbabilityMultiplier":
        return value < 20 || value > 200
          ? "Arrival probability multiplier must be between 20% and 200%."
          : "";
      case "carConsumption_kWh":
        return value <= 0 ? "Car consumption must be greater than 0." : "";
      case "chargingPowerPerPoint_kW":
        return value <= 0
          ? "Charging power per point must be greater than 0."
          : "";
      default:
        return "";
    }
  };

  // Validate entire form
  const validateForm = (data: typeof formData) => {
    const newErrors = {
      numberOfChargePoints: "",
      arrivalProbabilityMultiplier: "",
      carConsumption_kWh: "",
      chargingPowerPerPoint_kW: "",
    };

    Object.keys(data).forEach((field) => {
      const fieldName = field as keyof typeof formData;
      const value = data[fieldName];
      const error = validateField(fieldName, value);
      if (error) newErrors[fieldName] = error;
    });

    return newErrors;
  };

  // Handle change for form input fields
  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [field]: value };
        setErrors(validateForm(updatedData)); // Validate after each change
        return updatedData;
      });
    };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm(formData); // Validate on submit
    if (Object.values(formErrors).every((error) => error === "")) {
      const simulationResults = generateDummyData({
        numberOfChargePoints: formData.numberOfChargePoints,
        arrivalProbabilityMultiplier: formData.arrivalProbabilityMultiplier,
        chargingPowerPerPoint_kW: formData.chargingPowerPerPoint_kW,
        daysToSimulate: timeScaleToDays[timeScale], // Adjust simulation days based on selection
      });
      setSimulationData(simulationResults); // Update simulation data
    } else {
      setErrors(formErrors); // Set errors if form is invalid
    }
  };

  // Handle time scale change after data submission
  const handleTimeScaleChangeInOutput = (
    newTimeScale: "day" | "month" | "year"
  ) => {
    setTimeScale(newTimeScale);
    const updatedData = generateDummyData({
      numberOfChargePoints: formData.numberOfChargePoints,
      arrivalProbabilityMultiplier: formData.arrivalProbabilityMultiplier,
      chargingPowerPerPoint_kW: formData.chargingPowerPerPoint_kW,
      daysToSimulate: timeScaleToDays[newTimeScale], // Update simulation with new time scale
    });
    setSimulationData(updatedData);
  };

  // Whether the form is valid for submission
  const isFormValid = Object.values(errors).every((error) => error === "");

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center InputForm px-4">
      <h1 className="text-2xl font-bold text-center mb-6 customTitle">
        EV Charger Simulation
      </h1>
      <Form
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
      />

      {/* Conditionally render OutputDataVisuals if simulation data exists */}
      {simulationData && (
        <OutputDataVisuals
          data={simulationData}
          timeScale={timeScale}
          onTimeScaleChange={handleTimeScaleChangeInOutput}
        />
      )}
    </div>
  );
};

export default App;
