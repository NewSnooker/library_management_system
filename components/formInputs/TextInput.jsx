import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "",
  classNameInput,
  defaultValue = "",
  disabled=false
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
        <Input
          {...register(`${name}`, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          disabled={disabled}
          className={`${classNameInput}`}
          placeholder={ `ใส่ ${label.toLowerCase()}`}
        />
        {errors && errors[`${name}`] && (
          <span className="text-sm text-red-600 dark:text-red-400 ">
            {label} จำเป็นต้องกรอกข้อมูล
          </span>
        )}
      </div>
    </div>
  );
}
