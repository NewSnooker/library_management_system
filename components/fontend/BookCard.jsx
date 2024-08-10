import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BookCard({ book }) {
  return (
    <Link
      passHref
      href={"/"}
      className=" flex flex-col justify-center items-center overflow-hidden w-full mb-6"
    >
      <Image
        src={book.imageUrl}
        alt={book.title}
        width={200}
        height={100}
        className="object-cover w-28 h-36 rounded-sm "
      />
      <p className="text-sm sm:text-lg line-clamp-1 mt-2">{book.title}</p>
      <p className="text-sm line-clamp-1 text-muted-foreground ">
        {book.categoryBook}
      </p>
    </Link>
  );
}
