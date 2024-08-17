"use client";
import Image from "next/image";
import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
// import { Skeleton } from "../ui/skeleton";
export default function BookCard({ book }) {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   AOS.init();
  // }, []);
  // if (loading)
  //   return (
  //     <div className="flex flex-col justify-center items-center overflow-hidden w-full mb-6 ">
  //       <Skeleton className="w-28 h-36 rounded-sm" />
  //     </div>
  //   );

  return (
    <Link
      // data-aos="fade-up"
      // data-aos-duration="500"
      passHref
      href={"/books/slug"}
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
      <p className="text-sm sm:text-lg line-clamp-1 mt-2">{book.title}</p>
      <p className="text-sm line-clamp-1 text-muted-foreground ">
        {book.categoryBook}
      </p>
    </Link>
  );
}
