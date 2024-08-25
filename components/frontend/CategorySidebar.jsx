"use client";
import React, { useEffect, useState } from "react";
import { SquareLibrary } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

export default function CategorySidebar() {
  const router = useRouter();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: [`categories`],
    queryFn: () => getData(`categories`),
  });
  if (categoriesError) return <div>Error: {categoriesError.message}</div>;

  if (isCategoriesLoading)
    return (
      <div className="hidden sm:block border bg-card h-72 py-2 px-4 rounded-sm sticky top-20 ">
        <Skeleton className="w-full h-8 mb-2 rounded-sm" />
        <Skeleton className="w-full h-56 rounded-sm" />
      </div>
    );
  return (
    <div className=" border bg-card py-2 px-4 rounded-sm sticky top-20 ">
      <h2
        className="text-lg font-bold flex items-center justify-start border-b pb-2 text-custom-text cursor-pointer"
        onClick={() => router.push("/books/categories-books")}
      >
        <SquareLibrary className="mr-1 w-4 " /> หมวดหมู่
      </h2>
      <div className="mt-2 grid">
        {categories?.map((category) => (
          <Link
            href={`/books/categories-books/${category.slug}`}
            key={category.id}
            //   className={
            //     item.href == pathname
            //       ? "flex border-l-4 pl-2 my-1.5 font-thin border-custom-border text-custom-text dark:text-zinc-400"
            //       : "flex mb-1 "
            //   }
            className="flex"
          >
            <span>{category.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
