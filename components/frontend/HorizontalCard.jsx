import React from "react";
import BookCard from "./BookCard";
import { Skeleton } from "../ui/skeleton";

export default function HorizontalCard({ books, isLoading }) {
  if (isLoading) {
    return (
      <div className="mt-2 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center ">
        {Array.from({ length: 20 }, (_, i) => (
          <Skeleton key={i} className="w-28 h-36  mb-6 rounded-sm" />
        ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-2  ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center">
        {books && books.map((book, i) => <BookCard key={i} book={book} />)}
      </div>
    </div>
  );
}
