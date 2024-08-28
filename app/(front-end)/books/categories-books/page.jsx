"use client";
// import Banner from "@/components/fontend/Banner";
import WideCard from "@/components/frontend/WideCard";
import React from "react";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import { SquareLibrary } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function page() {
  const {
    data: categories,
    isLoading: isCategoriesAll,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categoriesAll"],
    queryFn: () => getData("all/categories"),
  });

  if (errorCategories) return <div>error</div>;

  return (
    <div className="">
      <HeadTitleBreadcrumb icon={SquareLibrary} />
      <div className="border bg-card py-2 px-4 rounded-sm">
        {isCategoriesAll ? (
          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className=" mb-6" >
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="py-4 px-20" />
                  <Skeleton className="py-4 px-10" />
                </div>
                <div className="mt-2 grid justify-center">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                    <Skeleton className="w-28 h-36 rounded-sm" />
                    <Skeleton className="w-28 h-36 rounded-sm" />
                    <Skeleton className="hidden sm:block w-28 h-36 rounded-sm" />
                    <Skeleton className="hidden sm:block w-28 h-36 rounded-sm" />
                    <Skeleton className="hidden sm:block w-28 h-36 rounded-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="">
            {categories?.map((category) => (
              <WideCard
                key={category.id}
                title={category.title}
                books={category.book}
                href={`/books/categories-books/${category.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
