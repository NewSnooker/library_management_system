import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className=" max-w-7xl mx-auto py-3 sm:py-6 px-4">{children}</div>
    </div>
  );
}
