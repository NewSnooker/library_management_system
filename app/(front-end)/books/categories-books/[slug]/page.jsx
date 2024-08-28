"use client";
import { getData } from '@/lib/getData';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from "react"; // เพิ่ม useState
import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import HorizontalCard from "@/components/frontend/HorizontalCard";
import { PaginationDemo } from "@/components/frontend/PaginationDemo";
import { X } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 20; // กำหนดค่านี้

export default function page({ params: { slug } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: [`categories_${slug}`],
    queryFn: () => getData(`all/categories/book/${slug}`),
  });
  
  const books = categories?.book;
  
  if (categoriesError) {
    <div className=""> Error: {categoriesError.message}</div>;
  }

  const totalPages = books ? Math.ceil(books.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books ? books.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="">
      <HeadTitleBreadcrumb icon={X} />
      <div className="border bg-card py-2 px-4 rounded-sm">
        <HorizontalCard books={currentBooks} isLoading={isCategoriesLoading} />{" "}
        {/* ใช้ currentBooks แทน books */}
        {totalPages > 1 ? (
          <PaginationDemo
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </div>
  )
}
