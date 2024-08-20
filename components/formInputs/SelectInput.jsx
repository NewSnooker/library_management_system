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
      <div className="">
        <select
          {...register(`${name}`)}
          id={name}
          name={name}
          multiple={multiple}
          className="appearance-none border bg-background text-muted-foreground px-1.5 sm:px-3 py-2 text-sm rounded-md w-full"
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
