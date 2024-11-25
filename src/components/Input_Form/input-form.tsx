import React, { useState } from "react";
import Input from "./input";
import "../Output_Data_Simulation/style.css"; // Assuming Input is in the same directory

interface FormData {
  numberOfChargePoints: number;
  arrivalProbabilityMultiplier: number;
  carConsumption_kWh: number;
  chargingPowerPerPoint_kW: number;
}

interface Errors {
  numberOfChargePoints: string;
  arrivalProbabilityMultiplier: string;
  carConsumption_kWh: string;
  chargingPowerPerPoint_kW: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    numberOfChargePoints: 20,
    arrivalProbabilityMultiplier: 100, // Stored as percentage
    carConsumption_kWh: 18,
    chargingPowerPerPoint_kW: 11,
  });

  const [errors, setErrors] = useState<Errors>({
    numberOfChargePoints: "",
    arrivalProbabilityMultiplier: "",
    carConsumption_kWh: "",
    chargingPowerPerPoint_kW: "",
  });

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

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, [field]: value };
        setErrors(validateForm(updatedFormData)); // Validate after each change
        return updatedFormData;
      });
    };

  const validateForm = (data: FormData): Errors => {
    const newErrors: Errors = {
      numberOfChargePoints: "",
      arrivalProbabilityMultiplier: "",
      carConsumption_kWh: "",
      chargingPowerPerPoint_kW: "",
    };

    Object.keys(data).forEach((field) => {
      const fieldName = field as keyof FormData;
      const value = data[fieldName];
      const error = validateField(fieldName, value);
      if (error) newErrors[fieldName] = error;
    });

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm(formData); // Validate on submit
    if (Object.values(formErrors).every((error) => error === "")) {
      console.log("Form Data Submitted:", formData);
      alert("Form successfully submitted!");
    } else {
      setErrors(formErrors); // Set errors if form is invalid
    }
  };

  const isFormValid = Object.values(errors).every((error) => error === "");

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center InputForm px-4">
      <h1 className="text-2xl font-bold text-center mb-6 customTitle">
        EV Charger Simulation
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md"
      >
        <Input
          label="Number of Charge Points"
          placeholder="Enter number of charge points"
          value={formData.numberOfChargePoints.toString()}
          onChange={handleChange("numberOfChargePoints")}
          type="number"
          error={errors.numberOfChargePoints}
        />

        {/* Arrival Probability Multiplier */}
        <Input
          label="Arrival Probability Multiplier (20% to 200%)"
          placeholder="Enter arrival probability multiplier"
          value={formData.arrivalProbabilityMultiplier.toString()}
          onChange={handleChange("arrivalProbabilityMultiplier")}
          type="number"
          error={errors.arrivalProbabilityMultiplier}
        />

        {/* Car Consumption */}
        <Input
          label="Car Consumption (kWh)"
          placeholder="Enter car consumption"
          value={formData.carConsumption_kWh.toString()}
          onChange={handleChange("carConsumption_kWh")}
          type="number"
          error={errors.carConsumption_kWh}
        />

        {/* Charging Power Per Point */}
        <Input
          label="Charging Power Per Point (kW)"
          placeholder="Enter charging power per point"
          value={formData.chargingPowerPerPoint_kW.toString()}
          onChange={handleChange("chargingPowerPerPoint_kW")}
          type="number"
          error={errors.chargingPowerPerPoint_kW}
        />

        <button
          type="submit"
          className={`mt-4 px-8 py-4 w-[200px] text-xl text-white rounded-lg transition duration-200 ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
