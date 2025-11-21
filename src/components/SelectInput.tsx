import React from "react";
import { type SelectInputProps } from "../types/types";

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  id,
  options = [],
  value,
  onChange,
}) => {
  return (
    <div className="separador">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        <option value="" disabled>
          ...
        </option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
