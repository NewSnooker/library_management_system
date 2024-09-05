import React from "react";

export default function IsReturnColumn({ row, accessorKey }) {
  const isReturn = row.getValue(`${accessorKey}`);

  return (
    <div className={isReturn ? "text-green-800 dark:text-green-500" : "text-yellow-800 dark:text-yellow-500"}>
      {isReturn ? "คืนแล้ว" : "ยังไม่คืน"}
    </div>
  );
}


