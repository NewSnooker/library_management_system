// import Banner from "@/components/fontend/Banner";
import WideCard from "@/components/fontend/WideCard";
import React from "react";

export default function page() {
  //ถ้า fetch ข้อมูลไม่ได้ ลองไปเช็ค ความเป็น "use client"; ในไฟล์ leyout.jsx
  return (
    <div className="">
      {/* <Banner  /> */}
      <div className="border bg-card py-2 px-4 rounded-sm">
        <WideCard title={"หนังสือที่แนะนำ"}/>
        <WideCard title={"หนังสือใหม่"}/>
      </div>
    </div>
  );
}
