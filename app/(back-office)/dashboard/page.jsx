"use client";
import { BarChartDemo } from "@/components/backoffice/dashboard/BarChart";
import HeadDashboard from "@/components/backoffice/dashboard/HeadDashboard";
import RecentBorrows from "@/components/backoffice/dashboard/RecentBorrows";
import PageHeaderNoAdd from "@/components/backoffice/PageHeaderNoAdd";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function page() {
  const {
    data: totalQuantity,
    isLoading:isTotalQuantityLoading,
    errorTotalQuantity,
  } = useQuery({
    queryKey: ["totalQuantity"],
    queryFn: () => getData("admin/books/total-quantity"),
  });
  const {
    data: totalRemaining,
    isLoading:isTotalRemainingLoading,
    errorRemaining,
  } = useQuery({
    queryKey: ["totalRemaining"],
    queryFn: () => getData("admin/books/total-remaining"),
  });
  const {
    data: totalActiveBooks,
    isLoading:isTotalActiveBooksLoading,
    errorTotalActiveBooks,
  } = useQuery({
    queryKey: ["totalActiveBooks"],
    queryFn: () => getData("admin/books/total-active"),
  });
  const quantity = totalQuantity?.totalQuantity || 0;
  const remaining = totalRemaining?.totalRemaining || 0;
  const totalBooks = totalActiveBooks?.totalBooks || 0;
  const totalActive = totalActiveBooks?.totalActiveBooks || 0;
  const borrowCount = quantity - remaining || 0;

  if (errorTotalQuantity) return <div>{errorTotalQuantity.message}</div>;
  if (errorRemaining) return <div>{errorRemaining.message}</div>;
  if (errorTotalActiveBooks) return <div>{errorTotalActiveBooks.message}</div>;
  return (
    <div className="px-4 sm:px-0">
      <PageHeaderNoAdd loading={isTotalRemainingLoading} heading="Dashboard" />

      <div className="">
        {isTotalQuantityLoading ||
        isTotalRemainingLoading ||
        isTotalActiveBooksLoading ||
        !totalQuantity ||
        !totalRemaining ||
        !totalActiveBooks ? (
          <Skeleton className="w-full h-32 mt-4 " />
        ) : (
          <div className="mt-4">
            <HeadDashboard
              quantity={quantity}
              remaining={remaining}
              totalBooks={totalBooks}
              totalActive={totalActive}
              borrowCount={borrowCount}
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="sm:col-span-1">
            <BarChartDemo />
          </div>
          <div className="sm:col-span-1">
            <RecentBorrows />
          </div>
        </div>
      </div>
    </div>
  );
}
