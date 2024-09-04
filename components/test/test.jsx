import React from "react";

export default function test() {
  return (
    <div>
      {" "}
      <div className="mt-2 py-4 sm:py-6 px-6 border rounded-sm sm:px-12 mb-2">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col sm:items-center">
            <div className="flex items-center justify-start">
              <Label className="mr-2 font-semibold">ค่าเสียหาย :</Label>
              <Input
                type="number"
                value={manualFine || calculatedFine} // แสดงค่าปรับที่คำนวณหรือค่าที่กรอก
                onChange={(e) => setManualFine(Number(e.target.value))}
                className="border border-red-800 dark:border-red-500 text-red-800 dark:text-red-500 mr-2 w-32 font-bold text-xl bg-red-100 dark:bg-transparent"
              />
              บาท
            </div>
            <div className="font-bold text-2xl mt-4">
              <Label className="">
                ค่าปรับรวม{" "}
                <span className="text-red-800 dark:text-red-500 text-2xl ">
                  {calculatedFine + manualFine}
                </span>{" "}
              </Label>
              บาท
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleConfirmReturn} className="">
              ยืนยันการคืน
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
