import React from "react";
import Input from "./InputField";
import { FormData, ErrorData } from "../../components/types";

interface FormProps {
  formData: FormData;
  formErrors: ErrorData;
  onInputChange: (
    field: keyof FormData
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFormValid: boolean;
}

const InputForm: React.FC<FormProps> = ({
  formData,
  formErrors,
  onInputChange,
  onFormSubmit,
  isFormValid,
}) => {
  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col items-center w-full max-w-md"
    >
      <Input
        label="Number of Charge Points"
        placeholder="Enter number of charge points"
        value={formData.numberOfChargePoints.toString()}
        onChange={onInputChange("numberOfChargePoints")}
        type="number"
        error={formErrors.numberOfChargePointsError}
      />

      <Input
        label="Arrival Probability Multiplier (20% to 200%)"
        placeholder="Enter arrival probability multiplier"
        value={formData.arrivalProbabilityMultiplier.toString()}
        onChange={onInputChange("arrivalProbabilityMultiplier")}
        type="number"
        error={formErrors.arrivalProbabilityMultiplierError}
      />

      <Input
        label="Car Consumption (kWh)"
        placeholder="Enter car consumption"
        value={formData.carConsumptionKWh.toString()}
        onChange={onInputChange("carConsumptionKWh")}
        type="number"
        error={formErrors.carConsumptionKWhError}
      />

      <Input
        label="Charging Power Per Point (kW)"
        placeholder="Enter charging power per point"
        value={formData.chargingPowerPerPointKW.toString()}
        onChange={onInputChange("chargingPowerPerPointKW")}
        type="number"
        error={formErrors.chargingPowerPerPointKWError}
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

export default InputForm;
