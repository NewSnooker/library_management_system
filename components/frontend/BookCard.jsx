"use client";
import Image from "next/image";
import Link from "next/link";
export default function BookCard({ book }) {
  return (
    <Link
      passHref
      href={`/books/${book.slug}`}
      className=" flex flex-col justify-center items-center overflow-hidden w-full mb-6 group "
    >
      <Image
        src={book.imageUrl}
        alt={book.title}
        width={200}
        height={100}
        loading="lazy"
        className="object-cover w-28 h-36 rounded-sm group-hover:scale-105 transition-all duration-300"
      />
      <p className="text-sm line-clamp-1 mt-2 mx-4 text-muted-foreground">{book.title}</p>
    </Link>
  );
}
