"use client";
import React from "react";
import Breadcrumb from "./Breadcrumb";
import { useRouter } from "next/navigation";

export default function HeadTitleBreadcrumb({ icon }) {
  const Icon = icon;
  const router = useRouter();
  return (
    <div className="border bg-card py-2 px-4 mb-3 rounded-sm">
      <div className="flex justify-between items-center w-full h-full ">
        <Breadcrumb />
        <Icon
          onClick={() => router.replace(`/home`)}
          className=" border-custom-border text-custom-text dark:text-zinc-400 cursor-pointer"
        ></Icon>
      </div>
    </div>
  );
}
