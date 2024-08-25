"use client";
// import Banner from "@/components/fontend/Banner";
import WideCard from "@/components/frontend/WideCard";
import React from "react";
import { books } from "@/lib/books";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";

export default function page() {
  const {
    data: booksAll,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useQuery({
    queryKey: ["books_all"],
    queryFn: () => getData("books"),
  });
  
  const {
    data: booksNewBooks,
    isLoading: isLoadingNewBooks,
    error: errorNewBooks,
  } = useQuery({
    queryKey: ["books_new_books"],
    queryFn: () => getData("books/new-books"),
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
