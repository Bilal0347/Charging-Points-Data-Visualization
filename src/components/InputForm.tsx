import React, { useState } from "react";
import "./style.css";

const InputForm = () => {
  const [formData, setFormData] = useState({
    chargePoints: 4,
    arrivalProbability: 100,
    carConsumption: 18,
    chargingPower: 11,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen CustomForm">
      <h1 className="text-2xl font-bold mb-6">Charge Simulator</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="chargePoints"
          >
            Number of Charge Points
          </label>
          <input
            type="number"
            name="chargePoints"
            id="chargePoints"
            value={formData.chargePoints}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min={1}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="arrivalProbability"
          >
            Arrival Probability Multiplier (%)
          </label>
          <input
            type="range"
            name="arrivalProbability"
            id="arrivalProbability"
            value={formData.arrivalProbability}
            onChange={handleChange}
            className="w-full"
            min={20}
            max={200}
          />
          <span>{formData.arrivalProbability}%</span>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="carConsumption"
          >
            Car Consumption (kWh)
          </label>
          <input
            type="number"
            name="carConsumption"
            id="carConsumption"
            value={formData.carConsumption}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min={1}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="chargingPower"
          >
            Charging Power (kW)
          </label>
          <input
            type="number"
            name="chargingPower"
            id="chargingPower"
            value={formData.chargingPower}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min={1}
          />
        </div>

        <button
          type="button"
          onClick={() => console.log("Simulated Output: ", formData)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Simulate
        </button>
      </form>

      <div className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-bold mb-4">Simulation Results</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default InputForm;
