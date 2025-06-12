import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  options: { label: string; value: string }[];
  defaultValue?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  register,
  options,
  defaultValue,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        defaultValue={defaultValue ?? ""}
        disabled={disabled}
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;