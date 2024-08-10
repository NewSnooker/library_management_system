import React from "react";
import WideCardCarousel from "./WideCardCarousel";
import { Button } from "../ui/button";
import Link from "next/link";

export default function WideCard({ title, books, href }) {
  return (
    <div className="mt-2 mb-10   ">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className=" text-lg sm:text-xl  ml-4 ">{title}</h1>
        <Link href={href}>
          <Button size="sm" variant="outline">
            ดูทั้งหมด
          </Button>
        </Link>
      </div>
      <WideCardCarousel books={books} />
    </div>
  );
}
