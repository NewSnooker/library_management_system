"use client";
import Banner from "@/components/fontend/Banner";
import Sidebar from "@/components/fontend/Sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({ children }) {
  const pathname = usePathname();
  const isBanner = pathname === "/books" ? true : false;
  return (
    <div className="">
      {isBanner && (
        <div className=" cursor-grabbing">
          <Banner />
        </div>
      )}
      <div className="lg:grid lg:grid-cols-12 gap-4 w-full ">
        <div className="hidden lg:block   lg:col-span-2 relative">
          <Sidebar />
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </div>
  );
}
