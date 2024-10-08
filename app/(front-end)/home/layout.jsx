"use client";
import Banner from "@/components/frontend/Banner";
import CategorySidebar from "@/components/frontend/CategorySidebar";
import Sidebar from "@/components/frontend/Sidebar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="">
      <div className=" cursor-grabbing">
        <Banner />
      </div>
      <div className="lg:grid lg:grid-cols-12 gap-4 w-full ">
        <div className="hidden lg:block  lg:col-span-2 relative">
          <Sidebar />
        </div>
        <div className="lg:col-span-8">{children}</div>
        <div className="hidden lg:block lg:col-span-2 relative">
          <CategorySidebar />
        </div>
      </div>
    </div>
  );
}
