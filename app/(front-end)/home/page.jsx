"use client";
// import Banner from "@/components/fontend/Banner";
import WideCard from "@/components/frontend/WideCard";
import React from "react";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";

export default function page() {
  const {
    data: booksAll,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useQuery({
    queryKey: ["booksAll"],
    queryFn: async() => {
      console.log("Fetching booksAll data");
      const data = await getData("books")
      console.log("booksAll data fetched", data);
      return data;
    }
  });
  
  const {
    data: booksNewBooks,
    isLoading: isLoadingNewBooks,
    error: errorNewBooks,
  } = useQuery({
    queryKey: ["booksNewBooks"],
    queryFn: () => getData("books/new-books"),
    staleTime: 10 * 1000,
    cacheTime: 15 * 60 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
  });
  
  if (errorAll || errorNewBooks) return <div>error</div>;

  return (
    <div className="">
      {/* <Banner  /> */}
      <div className="border bg-card py-2 px-4 rounded-sm">
        {/* <WideCard title={"หนังสือยอดนิยม"} books={books} href="/books/popular-books" /> */}
        <WideCard
          title={"หนังสือใหม่"}
          books={booksNewBooks}
          isLoading={isLoadingNewBooks}
          href="/books/new-books"
        />
        <WideCard
          title={"หนังสือทั้งหมด"}
          books={booksAll}
          isLoading={isLoadingAll}
          href="/books"
        />
      </div>
    </div>
  );
}
