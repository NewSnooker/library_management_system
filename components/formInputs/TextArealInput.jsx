"use client";
export default function TextAreaInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "sm:col-span-2",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 "
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          {...register(`${name}`, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className="block py-3  ps-10 text-sm text-gray-900 border-2 border-gray-300
          rounded-lg  bg-white focus:ring-slate-700 focus:border-slate-700
          dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-slate-400 dark:focus:border-slate-400 w-full shadow-inner"
          defaultValue={""}
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[`${name}`] && (
          <span className="text-sm  text-red-600 dark:text-red-400 ">{label} is required</span>
        )}
      </div>
    </div>
  );
}