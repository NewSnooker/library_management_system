import React from "react";

export default function StatusColumn({ row, accessorKey }) {
  const status = row.getValue(`${accessorKey}`);

  switch (status) {
    case "AVAILABLE":
      return <div className="text-green-500">พร้อมให้ยืม</div>;
    case "BORROWED":
      return <div className="text-red-500">ถูกยืมไปแล้ว</div>;
    case "OVERDUE":
      return <div className="text-red-500">ค้างคืนเกินกำหนด</div>;
    case "LOST":
      return <div className="text-red-500">สูญหาย</div>;
    case "DAMAGED":
      return <div className="text-red-500">ชำรุดเสียหาย</div>;
    case "NOT_AVAILABLE":
      return <div className="text-zinc-500">ไม่พร้อมยืม</div>;
    default:
      return <div>{status}</div>;
  }
}
