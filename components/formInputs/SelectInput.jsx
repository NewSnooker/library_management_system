import React from "react";
import { Label } from "../ui/label";

export default function SelectInput({
  label,
  name,
  register,
  className = "",
  options = [],
  multiple = false,
}) {
  return (
    <div className={className}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium leading-6 mb-1 "
      >
        {label}
      </Label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          id={name}
          name={name}
          multiple={multiple}
          className="border bg-transparent py-1 px-4 rounded-sm"
        >
          {options.map((option, i) => {
            return (
              <option
                key={i}
                value={option.id}
                className="bg-zinc-200 dark:bg-zinc-800"
              >
                {option.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
