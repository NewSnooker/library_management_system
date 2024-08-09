import React from "react";
import WideCardCarousel from "./WideCardCarousel";
import { Button } from "../ui/button";

export default function WideCard({ title }) {
  return (
    <div className="mt-2 mb-10   ">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className=" text-lg sm:text-xl  ml-4 ">{title}</h1>
        <Button size="sm" variant="outline">ดูทั้งหมด</Button>
      </div>
      <WideCardCarousel />
    </div>
  );
}
