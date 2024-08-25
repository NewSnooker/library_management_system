"use client";
import React, { useState } from "react"; // เพิ่ม useState
import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import HorizontalCard from "@/components/frontend/HorizontalCard";
import { PaginationDemo } from "@/components/frontend/PaginationDemo";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { BookText } from "lucide-react";

const ITEMS_PER_PAGE = 20; // กำหนดค่านี้

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books_home"],
    queryFn: () => getData("books"),
  });

  const totalPages = books ? Math.ceil(books.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books ? books.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <HeadTitleBreadcrumb icon={BookText} />
      <div className="border bg-card py-2 px-4 rounded-sm">
        <HorizontalCard books={currentBooks} isLoading={isLoading} />{" "}
        {/* ใช้ currentBooks แทน books */}
        {
          totalPages > 1 ? (
            <PaginationDemo
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          ) : null
        }
      </div>
    </div>
  );
}
