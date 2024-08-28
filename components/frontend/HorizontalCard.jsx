import React from "react";
import BookCard from "./BookCard";
import { Skeleton } from "../ui/skeleton";

export default function HorizontalCard({ books, isLoading }) {
  if (isLoading) {
    return (
      <div className="mt-2 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center justify-center gap-4 ">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="flex justify-center mb-6">
              <Skeleton className="w-28 h-36 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-2  ">
      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center">
          {books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <div className="text-zinc-500">ไม่มีข้อมูลหนังสือ</div>
        </div>
      )}
    </div>
  );
}
