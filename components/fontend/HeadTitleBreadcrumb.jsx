
import React from "react";
import Breadcrumb from "./Breadcrumb";


export default function HeadTitleBreadcrumb({ icon }) {
  const Icon = icon;

  return (
    <div className="border bg-card py-2 px-4 mb-3 rounded-sm">
      <div className="flex justify-between items-center w-full h-full ">
        <Breadcrumb />
        <Icon className=" border-custom-border text-custom-text dark:text-zinc-400 "></Icon>
      </div>
    </div>
  );
}
