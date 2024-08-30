"use client";
import React from "react";
import { SquareLibrary } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CategorySidebar() {
  const router = useRouter();
  const {
    data: categories = [], // ตั้งค่าเริ่มต้นเป็นอาร์เรย์ว่างเพื่อป้องกันข้อผิดพลาด
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: [`categoriesAll`],
    queryFn: () => getData(`all/categories`),
  });

  if (categoriesError) return <div>Error: {categoriesError.message}</div>;

  return (
    <div className="sticky top-20">
      {isCategoriesLoading ? (
        <div className="border bg-card h-72 py-2 px-4 rounded-sm">
          <Skeleton className="w-full h-8 mb-2 rounded-sm" />
          <Skeleton className="w-full h-56 rounded-sm" />
        </div>
      ) : (
        <div className="border bg-card py-2 px-4 rounded-sm">
          <h2
            className="text-lg font-bold flex items-center border-b pb-2 text-custom-text cursor-pointer"
            onClick={() => router.push("/books/categories-books")}
          >
            <SquareLibrary className="mr-1 w-4" /> หมวดหมู่
          </h2>
          <div className="mt-2 grid">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  href={`/books/categories-books/${category.slug}`}
                  key={category.id}
                  className="flex items-center p-2  rounded-md"
                >
                  <span>{category.title}</span>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center h-60">
                <div className="text-zinc-500">ไม่มีข้อมูลหมวดหมู่</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
