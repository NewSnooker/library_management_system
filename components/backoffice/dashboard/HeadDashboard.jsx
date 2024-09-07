import React from "react";

export default function HeadDashboard({
  quantity,
  remaining,
  totalBooks,
  totalActive,
  borrowCount,
}) {
  return (
    <div className=" grid grid-cols-8 gap-4">
      <div className="col-span-4 sm:col-span-2 border bg-card p-4 rounded-sm w-full">
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="text-sm font-medium">หนังสือทั้งหมด</h1>
            <div className="text-3xl font-bold m-2">
              {quantity.toLocaleString()}
            </div>
            <div>เล่ม</div>
          </div>
        </div>
      </div>
      <div className="col-span-4 sm:col-span-2 border bg-card p-4 rounded-sm w-full">
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="text-sm font-medium">หนังสือคงเหลือ</h1>
            <div className="text-3xl font-bold m-2">
              {remaining.toLocaleString()}
            </div>
            <div>เล่ม</div>
          </div>
        </div>
      </div>

      <div className="col-span-4 sm:col-span-2 border bg-card p-4 rounded-sm w-full">
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="text-sm font-medium">หนังสือที่ถูกยืม</h1>
            <div className="text-3xl font-bold m-2">{borrowCount}</div>
            <div>เล่ม</div>
          </div>
        </div>
      </div>
      <div className="col-span-4 sm:col-span-2 border bg-card p-4 rounded-sm w-full">
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="text-sm font-medium">หนังสือที่พร้อมยืม</h1>
            <div className="text-3xl font-bold m-2">
              {totalBooks.toLocaleString()} / {totalActive.toLocaleString()}
            </div>
            <div>เล่ม</div>
          </div>
        </div>
      </div>
    </div>
  );
}
