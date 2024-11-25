import React from "react";
import Input from "./input";

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

interface FormProps {
  formData: FormData;
  errors: Errors;
  handleChange: (
    field: keyof FormData
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFormValid: boolean;
}

const Form: React.FC<FormProps> = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isFormValid,
}) => {
  return (
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

      <Input
        label="Arrival Probability Multiplier (20% to 200%)"
        placeholder="Enter arrival probability multiplier"
        value={formData.arrivalProbabilityMultiplier.toString()}
        onChange={handleChange("arrivalProbabilityMultiplier")}
        type="number"
        error={errors.arrivalProbabilityMultiplier}
      />

      <Input
        label="Car Consumption (kWh)"
        placeholder="Enter car consumption"
        value={formData.carConsumption_kWh.toString()}
        onChange={handleChange("carConsumption_kWh")}
        type="number"
        error={errors.carConsumption_kWh}
      />

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
  );
};

export default Form;
