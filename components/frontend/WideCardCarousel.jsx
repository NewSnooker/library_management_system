"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
export default function WideCardCarousel({books}) {

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      breakpoints={{
        400: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        490: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        540: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        780: {
          slidesPerView: 5,
          spaceBetween: 0,
        },
      }}
      className="mb-6 mySwiper"
    >
      {books.map((book, i) => (
        <SwiperSlide key={i}>
          <Link href={"/books/slug"} className=" flex flex-col justify-center items-center overflow-hidden w-full">
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={200}
              height={100}
              className="object-cover w-28 h-36 rounded-sm "
            />
              <p className="text-sm sm:text-lg line-clamp-1 mt-2">
                {book.title}
              </p>
              <p className="text-sm line-clamp-1 text-muted-foreground ">
                {book.categoryBook}
              </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
