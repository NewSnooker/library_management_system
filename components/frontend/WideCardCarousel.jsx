"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
export default function WideCardCarousel({ books }) {
  const booksLimited = books.slice(0, 8);
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
      {booksLimited.map((book, i) => {

        return(
          <SwiperSlide key={i}>
          <Link
            href={`/books/${book.slug}`}
            className=" flex flex-col justify-center items-center overflow-hidden w-full"
          >
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={200}
              height={100}
              loading="lazy"
              className="object-cover w-28 h-36 rounded-sm "
            />
            <p className="text-sm line-clamp-1 mt-2 mx-4 text-muted-foreground">{book.title}</p>

          </Link>
        </SwiperSlide>
        )
      })}
    </Swiper>
  );
}
