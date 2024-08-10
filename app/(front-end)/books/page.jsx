import HeadTitleBreadcrumb from "@/components/fontend/HeadTitleBreadcrumb";
import HorizontalCard from "@/components/fontend/HorizontalCard";
import { books } from "@/lib/books";
import { BookText } from "lucide-react";
import React from "react";
export default function page() {
  return (
    <div className="">
      <HeadTitleBreadcrumb icon={BookText} />
      <div className="border bg-card py-2 px-4 rounded-sm">
        <HorizontalCard books={books} />
      </div>
    </div>
  );
}
