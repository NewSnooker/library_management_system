import { BarChartDemo } from "@/components/backoffice/dashboard/BarChart";
import HeadDashboard from "@/components/backoffice/dashboard/HeadDashboard";
import RecentBorrows from "@/components/backoffice/dashboard/RecentBorrows";
import React from "react";

export default function page() {
  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl ">Dashboard</h1>
      <div className="mt-4">
        <HeadDashboard />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="sm:col-span-1">
          <BarChartDemo />
        </div>
        <div className="sm:col-span-1"><RecentBorrows/></div>
      </div>
    </div>
  );
}
