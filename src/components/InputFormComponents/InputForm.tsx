import React, { useState } from "react";
import Input from "./InputField";
import { FormData, ErrorData, FormProps } from "../../components/types";

const InputForm: React.FC<FormProps> = ({
  formData,
  onSubmit,
  successMessage,
}) => {
  const [localFormData, setLocalFormData] = useState<FormData>(formData);
  const [formErrors, setFormErrors] = useState<ErrorData>({
    numberOfChargePointsError: "",
    arrivalProbabilityMultiplierError: "",
    carConsumptionKWhError: "",
    chargingPowerPerPointKWError: "",
  });

  // Validation logic
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
        return value <= 1
          ? "Charging power per point must be greater than 1."
          : "";
      default:
        return "";
    }
  };

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

  // Handle input changes
  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setLocalFormData((prevData) => {
        const updatedData = { ...prevData, [field]: value };
        setFormErrors(validateForm(updatedData)); // Validate after change
        return updatedData;
      });
    };

  // Check if the form is valid
  const isFormValid = Object.values(formErrors).every((error) => error === "");

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(localFormData);
    if (Object.values(errors).every((error) => error === "")) {
      onSubmit(localFormData); // Pass the validated data to parent component
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col items-center w-full max-w-md relative"
    >
      <Input
        label="Number of Charge Points"
        placeholder="Enter number of charge points"
        value={localFormData.numberOfChargePoints.toString()}
        onChange={handleInputChange("numberOfChargePoints")}
        type="number"
        error={formErrors.numberOfChargePointsError}
      />

      <Input
        label="Arrival Probability Multiplier (20% to 200%)"
        placeholder="Enter arrival probability multiplier"
        value={localFormData.arrivalProbabilityMultiplier.toString()}
        onChange={handleInputChange("arrivalProbabilityMultiplier")}
        type="number"
        error={formErrors.arrivalProbabilityMultiplierError}
      />

      <Input
        label="Car Consumption (kWh)"
        placeholder="Enter car consumption"
        value={localFormData.carConsumptionKWh.toString()}
        onChange={handleInputChange("carConsumptionKWh")}
        type="number"
        error={formErrors.carConsumptionKWhError}
      />

      <Input
        label="Charging Power Per Point (kW)"
        placeholder="Enter charging power per point"
        value={localFormData.chargingPowerPerPointKW.toString()}
        onChange={handleInputChange("chargingPowerPerPointKW")}
        type="number"
        error={formErrors.chargingPowerPerPointKWError}
      />

      {successMessage && (
        <div className="block bg-green-200 text-green-800 p-4 rounded shadow-lg mt-4 success-message-style">
          {successMessage}
        </div>
      )}

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
  );
};

export default InputForm;
