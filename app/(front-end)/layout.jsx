// components/Layout.jsx
import Navbar from "@/components/frontend/navbar/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="relative">
      <Navbar className={" max-w-7xl border-b mx-auto py-2 sm:py-3 px-4"} />
      <div className="max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-0">
        <div>{children}</div>
      </div>
    </div>
  );
}