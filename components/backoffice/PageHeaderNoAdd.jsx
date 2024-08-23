import React from "react";
import Heading from "./Heading";
import { Skeleton } from "../ui/skeleton";

export default function PageHeaderNoAdd({ loading, heading }) {
  if (loading) {
    return (
      <Skeleton className=" sm:flex items-center justify-between py-6 sm:py-8 px-6  sm:px-12 mb-2"></Skeleton>
    );
  }
  return (
    <div className=" sm:flex items-center justify-start py-4 sm:py-6 px-6 border rounded-sm sm:px-12 mb-2">
      <Heading title={heading} className={"mb-0"}/>
    </div>
  );
}
