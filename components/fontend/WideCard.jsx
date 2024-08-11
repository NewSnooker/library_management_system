"use client";
import React, { useEffect, useState } from "react";
import WideCardCarousel from "./WideCardCarousel";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export default function WideCard({ title, books, href }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if(loading)
  return (
    <div className="mt-2 mb-10">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="py-4 px-20"></Skeleton>
        <Skeleton className="py-4 px-10"></Skeleton>
      </div>
      <div className="mt-2 grid justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        <Skeleton className="w-28 h-36 rounded-sm" />
        <Skeleton className="w-28 h-36 rounded-sm" />
        <Skeleton className="hidden sm:block w-28 h-36 rounded-sm" />
        <Skeleton className="hidden sm:block w-28 h-36 rounded-sm" />
        <Skeleton className="hidden sm:block w-28 h-36 rounded-sm" />
        </div>
      </div>
    </div>
  );

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
