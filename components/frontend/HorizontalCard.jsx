import React from "react";
import BookCard from "./BookCard";

export default function HorizontalCard({books}) {
  return (
    <div className="mt-2  ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center">
        {books.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
    </div>
  );
}
