import HeadTitleBreadcrumb from "@/components/fontend/HeadTitleBreadcrumb";
import HorizontalCard from "@/components/fontend/HorizontalCard";
import { PaginationDemo } from "@/components/fontend/PaginationDemo";
import { books } from "@/lib/books";
import { Book, BookCheck, BookText } from "lucide-react";
import React from "react";
export default function page() {
  return (
    <div className="">
      <HeadTitleBreadcrumb icon={Book} />
      <div className="border bg-card py-2 px-4 rounded-sm">
        <HorizontalCard books={books} />
        <PaginationDemo />
      </div>
    </div>
  );
}
