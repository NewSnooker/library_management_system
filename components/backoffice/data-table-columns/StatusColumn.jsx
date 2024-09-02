import React from "react";

export default function StatusColumn({ row, accessorKey }) {
  const status = row.getValue(`${accessorKey}`);

  switch (status) {
    case "BORROWED":
      return <div className="text-yellow-800 dark:text-yellow-500">กำลังยืม</div>;
    case "OVERDUE":
      return <div className="text-orange-800 dark:text-orange-500">ค้างคืนเกินกำหนด</div>;
    case "LOST":
      return <div className="text-red-800 dark:text-red-500">สูญหาย</div>;
    case "RETURNED":
      return <div className="text-green-800 dark:text-green-500">ส่งคืนแล้ว</div>;
    default:
      return <div>{status}</div>;
  }
}
