import React from "react";
import "./input-style.css";
import { InputProps } from "../types";

const Input = ({
  label,
  placeholder,
  value,
  type,
  onChange,
  error,
}: InputProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center block mb-6 w-full max-w-[500px] px-4">
      <label className="text-gray-300 text-1xl top-10 flex flex-row self-start custom-label-class w-full">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`h-20 w-full px-6 text-1xl text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300  transition duration-200 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
