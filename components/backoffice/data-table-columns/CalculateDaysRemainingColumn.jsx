import React from "react";

export default function CalculateDaysRemainingColumn({ row, accessorKey }) {
  const dueDate = row.getValue(`${accessorKey}`);
  const today = new Date();
  const due = new Date(dueDate);
  const difference = due - today;
  const daysRemaining = Math.round(difference / (1000 * 60 * 60 * 24));
  return (
    <div className=" w-full flex justify-center">
      <div className="">{daysRemaining > 0 ? daysRemaining : 0}</div>
    </div>
  );
}
