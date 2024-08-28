"use client";
import React from "react";
import WideCardCarousel from "./WideCardCarousel";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export default function WideCard({ title, books, isLoading = false, href }) {
  return (
    <div className="mt-2 mb-10">
      {isLoading ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="py-4 px-20" />
            <Skeleton className="py-4 px-10" />
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
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4 w-full">
            <h1 className="text-lg sm:text-xl ml-4">{title}</h1>
            <Link href={href}>
              <Button
                size="sm"
                variant="outline"
                className="bg-custom-text dark:bg-custom-background border border-custom-border text-zinc-100"
              >
                ดูทั้งหมด
              </Button>
            </Link>
          </div>
          <div className="">
            {books && books.length > 0 ? ( // ถ้ามีข้อมูลหนังสือ ให้แสดง Carousel
              <WideCardCarousel books={books} />
            ) : (
              <div className="flex justify-center items-center h-60">
                <div className="text-zinc-500">ไม่มีข้อมูลหนังสือ</div>
              </div> // ถ้าไม่มีข้อมูลหนังสือ ให้แสดงข้อความว่าไม่มีข้อมูล
            )}
          </div>
        </div>
      )}
    </div>
  );
}
