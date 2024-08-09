import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="relative">
        <Navbar />
        <div className="max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-0  ">
          <div>{children}</div>
        </div>
      </div>
  );
}
