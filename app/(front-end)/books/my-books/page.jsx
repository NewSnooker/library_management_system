import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import HorizontalCard from "@/components/frontend/HorizontalCard";
import { PaginationDemo } from "@/components/frontend/PaginationDemo";
import { books } from "@/lib/books";
import { Album, BookCheck, BookText } from "lucide-react";
import React from "react";
export default function page() {
  return (
    <div className=""></div>
    // <div className="">
    //   <HeadTitleBreadcrumb icon={Album} />
    //   <div className="border bg-card py-2 px-4 rounded-sm">
    //     <HorizontalCard books={books} />
    //     <PaginationDemo />
    //   </div>
    // </div>
  );
}
