"use client";

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function TextAreaInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "",
  classNameInput,
  defaultValue = "",
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
        <Textarea
          {...register(`${name}`, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className={`${classNameInput} `}
          defaultValue={defaultValue}
          placeholder={`ใส่ ${label.toLowerCase()}`}
        />
        {errors[`${name}`] && (
          <span className="text-sm  text-red-600 dark:text-red-400 ">
            {label} is required
          </span>
        )}
      </div>
    </div>
  );
}
