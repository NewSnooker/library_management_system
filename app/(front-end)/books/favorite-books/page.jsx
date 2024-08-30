"use client";
import React, { useEffect, useState } from "react"; // เพิ่ม useState
import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import HorizontalCard from "@/components/frontend/HorizontalCard";
import { PaginationDemo } from "@/components/frontend/PaginationDemo";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 20; // กำหนดค่านี้

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const id = session?.user?.id;
  const router = useRouter();
  // console.log(id);

  const {
    data: favoriteBook,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorite_books"],
    queryFn: () => getData(`all/books/favoriteBook/${id}`),
    enabled: !!id,
  });
  
  useEffect(() => {
    if (!id) {
      router.push("/login");
    }
  }, [id, router]);

  if (error) {
    <div className=""> Error: {error.message}</div>;
  }

  const books = favoriteBook?.map((item) => item.book);
  const totalPages = books ? Math.ceil(books.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentBooks = books ? books.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <HeadTitleBreadcrumb icon={Heart} />
      <div className="border bg-card py-2 px-4 rounded-sm">
        <HorizontalCard books={currentBooks} isLoading={isLoading} />{" "}
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
  );
}
